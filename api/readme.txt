Ce fichier recense tous les endpoints de l'API ainsi que la méthode pour les tester.
Ces scripts sont à copier dans un powershell après avoir lancé l'API.
Ne pas oublier de changer l'url si besoin!!!!
(Pour les app.get, il suffit de mettre l'url/le_nom_de_l'enpoint_de_récupération)

endpoint app.post('/register'
    Permet d'ajouter un utilisateur.

# Définir l'URL de l'endpoint register
$url = "http://localhost:3000/register"

# Définir les données à envoyer (par exemple, le nom d'utilisateur)
$data = @{
    username = "nouvel_utilisateur"
}

# Convertir les données en format JSON
$jsonData = $data | ConvertTo-Json

# Envoyer la requête POST à l'endpoint register
$response = Invoke-RestMethod -Uri $url -Method Post -Body $jsonData -Headers @{ "Content-Type" = "application/json" }

# Afficher la réponse
$response

####################################################################################################################################
endpoint app.delete('/users/:userId'
    permet de supprimer un utilisateur

# Définir l'URL de l'endpoint DELETE avec l'ID de l'utilisateur à supprimer
$url = "http://localhost:3000/users/1"  # Remplacez 1 par l'ID de l'utilisateur que vous souhaitez supprimer

# Envoyer la requête DELETE à l'endpoint
$response = Invoke-RestMethod -Uri $url -Method Delete

# Afficher la réponse
$response

####################################################################################################################################
endpoint app.get('/users'
    permet d'afficher tous les utilisateurs (id et username)

Soit on va directement à l'adresse/users
soit:
# Définir l'URL de l'endpoint /users
$url = "http://localhost:3000/users"

# Envoyer la requête GET à l'endpoint /users
$response = Invoke-RestMethod -Uri $url -Method Get

# Afficher la réponse
$response

#####################################################################################################################################
endpoint app.post('/login'
    Endpoint pour se connecter (push un nouvel utilisateur et renvoie un token et un ID)

# Définir l'URL de l'endpoint login
$url = "http://localhost:3000/login"

# Définir les données à envoyer (par exemple, le nom d'utilisateur et le mot de passe)
$data = @{
    username = "votre_nom_utilisateur"
    password = "votre_mot_de_passe"
}

# Convertir les données en format JSON
$jsonData = $data | ConvertTo-Json

# Envoyer la requête POST à l'endpoint login
$response = Invoke-RestMethod -Uri $url -Method Post -Body $jsonData -Headers @{ "Content-Type" = "application/json" }

# Afficher la réponse
$response

######################################################################################################################################
endpoint app.post('/photo'
    Endpoint pour push une photo

# Définir l'URL de l'endpoint /photo
$url = "http://localhost:3000/photo"

# Définir les données à envoyer (exemple : id_person, nom_plante, date_debut, date_fin, description, url_photo)
$data = @{
    id_person    = 1
    nom_plante   = "Nom de la plante"
    date_debut   = "2023-01-01"
    date_fin     = "2023-12-31"
    description  = "Description de la photo"
    url_photo    = "https://exemple.com/photo.jpg"
}

# Convertir les données en format JSON
$jsonData = $data | ConvertTo-Json

# Envoyer la requête POST à l'endpoint /photo
$response = Invoke-RestMethod -Uri $url -Method Post -Body $jsonData -Headers @{ "Content-Type" = "application/json" }

# Afficher la réponse
$response

#####################################################################################################################################
endpoint app.get('/all-plants'
    Endpoint pour récupérer toutes les plantes

# Définir l'URL de l'endpoint all-plants
$url = "http://localhost:3000/all-plants"

# Envoyer la requête GET à l'endpoint all-plants
$response = Invoke-RestMethod -Uri $url -Method Get

# Afficher la réponse
$response

######################################################################################################################################
endpoint app.post('/conseil'
    Endpoint pour ajouter un conseil (push un nouveau conseil)

# Définir l'URL de l'endpoint /conseil
$url = "http://localhost:3000/conseil"

# Définir les données à envoyer (exemple : id_person, nom_plante, conseil)
$data = @{
    id_person    = 1
    nom_plante   = "Nom de la plante"
    conseil      = "Conseil pour la plante"
}

# Convertir les données en format JSON
$jsonData = $data | ConvertTo-Json

# Envoyer la requête POST à l'endpoint /conseil
$response = Invoke-RestMethod -Uri $url -Method Post -Body $jsonData -Headers @{ "Content-Type" = "application/json" }

# Afficher la réponse
$response

#####################################################################################################################################
endpoint app.get('/all-conseils'
    Endpoint pour récupérer tous les conseils

# Définir l'URL de l'endpoint /all-conseils
$url = "http://localhost:3000/all-conseils"

# Envoyer la requête GET à l'endpoint /all-conseils
$response = Invoke-RestMethod -Uri $url -Method Get

# Afficher la réponse
$response

#####################################################################################################################################
endpoint app.get('/user-plants/:id_user'
    Endpoint pour récupérer les plantes d'un utilisateur

# Définir l'URL de l'endpoint /user-plants/:id_user en remplaçant {id_user} par l'ID de l'utilisateur
$id_user = 1  # Remplacez 1 par l'ID de l'utilisateur que vous souhaitez récupérer
$url = "http://localhost:3000/user-plants/$id_user"

# Envoyer la requête GET à l'endpoint /user-plants/:id_user
$response = Invoke-RestMethod -Uri $url -Method Get

# Afficher la réponse
$response

######################################################################################################################################
endpoint 
