import 'package:arosa_je/modules/auth/login/model/auth_alert_message.dart';
import 'package:arosa_je/modules/auth/login/model/login_status.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'notifier.g.dart';

@Riverpod(keepAlive: false)
class Login extends _$Login {
  @override
  FutureOr<bool> build() {
    return false;
  }

  /*Future<void> login(
    String login,
    String password,
    bool generateMfaToken,
  ) async {
    state = const AsyncLoading();
    ref.read(loginFormProvider.notifier).setConnectionMessageError(
          AuthAlertMessage.none,
        );
    final loginRepository = ref.read(loginRepositoryProvider);
    state =
        await AsyncValue.guard(() => loginRepository.login()); //TODO add fields
  }*/
}

@Riverpod(keepAlive: false)
class LoginForm extends _$LoginForm {
  @override
  LoginStatus build() {
    return LoginStatus();
  }

  void setConnectionMessageError(
    AuthAlertMessage alertMessage,
  ) {
    state = state.copyWith(
      alertMessage: alertMessage,
    );
  }

  void setUsername(String username) {
    state = state.copyWith(
      username: username,
    );

    isFieldsEmpty();
  }

  void setIsButtonActive(bool isActive) {
    state = state.copyWith(
      isButtonActive: isActive,
    );
  }

  bool isError() {
    return state.alertMessage != AuthAlertMessage.none;
  }

  void isFieldsEmpty() {
    setIsButtonActive(state.username.isNotEmpty);
  }

  void setLoading(bool isLoading) {
    state = state.copyWith(isLoading: isLoading);
  }
}
