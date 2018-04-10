<?php

function send($to, $subject, $body)
{
    $body .= '<div style="font-size:0.8em; color:#777; border-top:1px silver solid; margin-top:15px">Контроль адреса IP отправителя ' . $_SERVER['REMOTE_ADDR'] . '.<br>Не отвечайте на это письмо, оно сгенерированно сайтом автоматически при обращении через сайт. Некоторые письма могут быть спамом людей, отправивших его через сайт.</div>';

    $mail_subject = $_SERVER['HTTP_HOST'] . ' - ' . $subject;
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: " . 'info@remtechspb.ru' . " <" . 'info@taxi.ru' . ">\r\n";
    if (strpos($to, ',') !== false) {
        $toExp = explode(',', $to);
        foreach ($toExp as $e) {
            if (empty($e)) {
                continue;
            }
            mail($e, $mail_subject, $body, $headers);
        }
    } else {
        mail($to, $mail_subject, $body, $headers);
    }
    return;
}

$text = 'Обратная связь' . $_POST['phone']  . ' от '  . $_POST['name'];
send('gaevoy@indins.ru','Обратная связь', $text);