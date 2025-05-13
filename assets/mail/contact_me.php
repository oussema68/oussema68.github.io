<?php
// Check for empty fields
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['phone'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "No arguments Provided!";
   return false;
   }
   
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));
   
// Create the email and send the message
$to = 'ohammadi.oh@gmail.com';
$email_subject = "Website Contact Form: $name";
$email_body = "You have received a new message from your website contact form.\n\n"
    . "Here are the details:\n\n"
    . "Name: $name\n\n"
    . "Email: $email_address\n\n"
    . "Phone: $phone\n\n"
    . "Message:\n$message";

$headers = "From: noreply@yourdomain.com\r\n";
$headers .= "Reply-To: $email_address\r\n";

// Send email
if (mail($to, $email_subject, $email_body, $headers)) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'mail() failed']);
}
return;
