<?php
// El mensaje
$mensaje = $_POST["first_name"].' '.$_POST['last_name'].' '.$_POST['email'].' '.$_POST['comment'];

// Si cualquier línea es más larga de 70 caracteres, se debería usar wordwrap()
$mensaje = wordwrap($mensaje, 70, "\r\n");

// Enviarlo
mail('carlosreyes@gadget-technology.com', 'Contact', $mensaje);
?>