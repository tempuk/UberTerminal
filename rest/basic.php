<?php
$action = isset($_GET['action']) ? $_GET['action'] : "";
header('content-type: application/json');
if ($action == "host") {
    die(json_encode($_SERVER));
}
?>