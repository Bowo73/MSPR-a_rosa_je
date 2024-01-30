const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3306;

app.use(bodyParser.json());

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
  host: '172.17.0.2',
  user: 'test123',
  password: 'testing123',
  database: 'A_rosa_je'
});

// Connexion à la base de données MySQL
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données MySQL :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Endpoint pour s'enregistrer (push un nouvel utilisateur)
app.post('/register', (req, res) => {
    const { username } = req.body;
  
    if (username) {
      // Générer un GUID pour l'ID de l'utilisateur (pas ouf à voir si on peut faire mieux)
      const userId = generateUserId();
  
      // Insérer l'utilisateur dans la base de données avec l'ID généré
      db.query('INSERT INTO users (id, username) VALUES (?, ?)', [userId, username], (err) => {
        if (err) {
          return res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur dans la base de données.' });
        }
  
        // Réponse avec l'ID de l'utilisateur
        res.status(201).json({ id: userId, username: username, message: 'Utilisateur enregistré avec succès.' });
      });
    } else {
      res.status(400).json({ error: 'Le champ "username" est requis.' });
    }
  });

// Endpoint pour supprimer un utilisateur
app.delete('/users/:userId', (req, res) => {
  const userId = req.params.userId;

  if (userId) {
    // Supprimer l'utilisateur de la base de données
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur dans la base de données.' });
      }

      if (result.affectedRows === 0) {
        //L'utilisateur n'aexiste pas
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }

      // Réponse avec l'ID de l'utilisateur supprimé
      res.status(200).json({ id: userId, message: 'Utilisateur supprimé avec succès.' });
    });
  } else {
    res.status(400).json({ error: 'L\'ID de l\'utilisateur est requis pour supprimer un utilisateur.' });
  }
});

// Endpoint pour obtenir la liste de tous les utilisateurs
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs depuis la base de données.' });
    }
  // Réponse à l'application cliente avec la liste des utilisateurs et le statut 200 (OK)
  res.status(200).json(rows);
  })
});

// Endpoint pour se connecter (push un nouvel utilisateur et renvoie un token et un ID)
app.post('/login', (req, res) => {
  const { username } = req.body;

  if (username) {
    // Insérer l'utilisateur dans la base de données
    db.query('INSERT INTO users (username) VALUES (?)', [username], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur dans la base de données.' });
      }

      // Récupérer l'ID de l'utilisateur ajouté
      const userId = result.insertId;

      // Générer un token (tjrs la même fct pas ouf à changer)
      const token = generateToken();

      // Réponse avec le token et l'ID de l'utilisateur
      res.status(200).json({ id: userId, username: username, token: token, message: 'Utilisateur connecté avec succès.' });
    });
  } else {
    res.status(400).json({ error: 'Le champ "username" est requis.' });
  }
});
    
// Endpoint pour ajouter une photo (push une nouvelle photo)
app.post('/photo', (req, res) => {
  const { id_user, nom_plante, date_debut, date_fin, description, url_photo } = req.body;

  if (id_user && nom_plante && date_debut && date_fin && description && url_photo) {
    // Insérer la photo dans la base de données
    db.query('INSERT INTO photos (id_user, nom_plante, date_debut, date_fin, description, url_photo) VALUES (?, ?, ?, ?, ?, ?)',
      [id_user, nom_plante, date_debut, date_fin, description, url_photo],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Erreur lors de l\'ajout de la photo dans la base de données.' });
        }

        // Récupérer l'ID de la photo ajoutée
        const photoId = result.insertId;

        // Réponse avec l'ID de la photo
        res.status(201).json({ id: photoId, message: 'Photo ajoutée avec succès.' });
      });
  } else {
    res.status(400).json({ error: 'Tous les champs sont requis pour ajouter une photo.' });
  }
});

// Endpoint pour récupérer toutes les plantes (au démarrage de l'application)
app.get('/all-plants', (req, res) => {
  // Récupérer toutes les plantes depuis la base de données
  db.query('SELECT * FROM photos', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de toutes les plantes depuis la base de données.' });
    }

    // Réponse avec la liste de toutes les plantes
    res.status(200).json(rows);
  });
});


// Endpoint pour ajouter un conseil (push un nouveau conseil)
app.post('/conseil', (req, res) => {
  const { id_user, nom_plante, conseil } = req.body;

  if (id_user && nom_plante && conseil) {
    // Insérer le conseil dans la base de données
    db.query('INSERT INTO conseils (id_user, nom_plante, conseil) VALUES (?, ?, ?)',
      [id_user, nom_plante, conseil],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Erreur lors de l\'ajout du conseil dans la base de données.' });
        }

        // Récupérer l'ID du conseil ajouté
        const conseilId = result.insertId;

        // Réponse avec l'ID du conseil
        res.status(201).json({ id: conseilId, message: 'Conseil ajouté avec succès.' });
      });
  } else {
    res.status(400).json({ error: 'Tous les champs sont requis pour ajouter un conseil.' });
  }
});

// Endpoint pour récupérer tous les conseils
app.get('/all-conseils', (req, res) => {
  // Récupérer tous les conseils depuis la base de données
  db.query('SELECT * FROM conseils', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de tous les conseils depuis la base de données.' });
    }

    // Réponse avec la liste de tous les conseils
    res.status(200).json(rows);
  });
});

// Endpoint pour récupérer les plantes d'un utilisateur
app.get('/user-plants/:id_user', (req, res) => {
  const id_user = req.params.id_user;

  if (id_user) {
    // Récupérer les plantes de l'utilisateur depuis la base de données à partir de son id
    db.query('SELECT * FROM photos WHERE id_user = ?', [id_user], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la récupération des plantes de l\'utilisateur depuis la base de données.' });
      }

      // Réponse avec la liste des plantes de l'utilisateur
      res.status(200).json(rows);
    });
  } else {
    res.status(400).json({ error: 'L\'ID de l\'utilisateur est requis pour récupérer ses plantes.' });
  }
});

// Fonction pour générer un ID utilisateur simple (à remplacer prcq c'est pas ouf)
function generateUserId() {
    return Math.random().toString(36).substring(2, 10);
  }
  
// Fonction pour générer un token (pas ouf je regarde plus tard une autre méthode)
function generateToken() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});