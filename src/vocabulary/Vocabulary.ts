export interface Vocabulary {
    [key :string] :string;
}

export const V : Vocabulary={
    accessCode: 'Код доступа:',
    inputAccessCode : 'Введите код доступа',
    requestCode : 'Запросить код доступа',
    aboutCode : 'Для входа в систему используется временный код доступа. Вы можете запросить код, отправив ваш адресс электронной почты администратору.' +
        ' Полученный код можно передавать другим пользователям',
    email : 'Адрес электронной почты',
    messageToAdmin : 'Сообщение',
    youNotRegistered : '',
    doAuthorize : '',

    searchNumber : 'Поиск числа',
    inputNumber : 'Введите число',
    search : 'Поиск',
    login : 'Войти',
    enter_code : 'Ввести код',
    numberOutOfRange : 'Число за пределами текущих знаний системы',
    register : 'Зарегистрироваться',
    registration: 'Регистрация',
    cancel : 'Отмена',
    password: 'Пароль',
    input_password: 'Введите пароль',
    repeat_password: 'Повторите пароль',
    register_terms : 'Пройдя процедуру регистрации вы получите временный код доступа к книге. Код можно передавать другим пользователям.',


    exception : 'Ошибка',
    server_unreachable : 'Не удалось связаться с сервером',
    no_network : 'Отсутствует соединение с сетью или сервер недоступен',
    operation_completed : 'Операция завершена',
    operation_success : 'Операция завершена успешно',
    authorization_failure : 'Не удалось авторизоваться на сервере',
    bad_credentials : 'Не верный логин или пароль',
    operation_denied : 'Операция не разрешена',
    permission_required : 'Недотаточно прав для выполнения операции',
    interface_label_301 : 'Пользователь заблокирован',
    contact_administration : 'Для выяснения причин свяжитесь с администрацией',
    operation_error : 'Ошибка операции',
    unprocessable_request : 'Запрос не может быть обработан на сервере',
    object_missing : 'Искомый объект не найден или не принадлежит вам',
    wrong_password : 'Неверный пароль',
    wrong_password_confirmation : 'Пароль и подтверждение не совпадают',
    bad_request : 'Неправильный запрос',
    bad_request_data : 'В запросе указаны некорректные данные',
    conflict : 'Конфликт',
    duplicated_id : 'Ресурс с таким идентификатором уже существует',
    data_in_use : 'Данные не могут быть удалены, пока на на них ссылаются другие данные',
    not_found : 'Ресурс не найден',
    no_data_found : 'По вашему запросу ничего не найдено',
    processing : 'Запрос обрабатывается',
    waiting_server_response : 'Запрос отправлен, программа ожидает ответ сервера...',
    operation_time_out : 'Превышено время ожидания',
    server_time_out : 'Ответ от сервера не был получен в течении допустимого времени.',
};

export const searchNumber = 'searchNumber';
export const inputNumber = 'inputNumber';
export const search = 'search';
export const login = 'login';
export const register = 'register';
export const registration = 'registration';
export const cancel = 'cancel';
export const enter_code = 'enter_code';
export const numberOutOfRange = 'numberOutOfRange';
export const requestCode = 'requestCode';
export const aboutCode = 'aboutCode';
export const email = 'email';
export const messageToAdmin = 'messageToAdmin';
export const accessCode=  'accessCode';
export const inputAccessCode = 'inputAccessCode';
export const password = 'password';
export const input_password = 'input_password';
export const repeat_password = 'repeat_password';
export const register_terms = 'register_terms';
export const exception = 'exception';
export const server_unreachable = 'server_unreachable';
export const no_network = 'no_network';
export const operation_completed = 'operation_completed';
export const operation_success = 'operation_success';
export const authorization_failure = 'authorization_failure';
export const bad_credentials = 'bad_credentials';
export const operation_denied = 'operation_denied';
export const permission_required = 'permission_required';
export const interface_label_301 = 'interface_label_301';
export const contact_administration = 'contact_administration';
export const operation_error = 'operation_error';
export const unprocessable_request = 'unprocessable_request';
export const object_missing = 'object_missing';
export const wrong_password = 'wrong_password';
export const wrong_password_confirmation = 'wrong_password_confirmation';
export const bad_request = 'bad_request';
export const bad_request_data = 'bad_request_data';
export const conflict = 'conflict';
export const duplicated_id = 'duplicated_id';
export const data_in_use = 'data_in_use';
export const not_found = 'not_found';
export const no_data_found = 'no_data_found';
export const processing = 'processing';
export const waiting_server_response = 'waiting_server_response';
export const operation_time_out ='operation_time_out';
export const server_time_out ='server_time_out';
