<?php
require_once('controllers/DatabaseController.php');
  $requestType = $_SERVER['REQUEST_METHOD'];
  $result = '';
  switch ($requestType){
    case 'POST':
      $postParameters = file_get_contents('php://input');
      $userData = json_decode($postParameters);

      $name = filter_var($userData->name, FILTER_SANITIZE_STRING);
      $email = filter_var($userData->email, FILTER_SANITIZE_STRING);
      $comment = filter_var($userData->comment, FILTER_SANITIZE_STRING);

      $dbConnection = new DatabaseController();
      $connection = $dbConnection->connect();
      $query = "INSERT INTO visitors (Name, Email, LeftComment)".
               "VALUES('$name', '$email', '$comment')";
      $result = $dbConnection->sendQuery($connection, $query, $requestType);
      break;
    case 'GET':
      $dbConnection = new DatabaseController();
      $connection = $dbConnection->connect();
      $query = "select * from visitors";
      $result = $dbConnection->sendQuery($connection, $query, $requestType);
      break;
    default :
      $result = 'No functional method defined';
  }

  exit(json_encode($result));
