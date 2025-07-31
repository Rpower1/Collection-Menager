<?php
// Ontvang ruwe JSON van de client
$json = file_get_contents('php://input');

// Optioneel: valideren
if ($json === false) {
    http_response_code(400); // Bad request
    exit("Geen JSON ontvangen");
}

// Sla op naar bestand
file_put_contents('collection.json', $json);

// Geef succesmelding
http_response_code(200);
echo "OK";
?>
