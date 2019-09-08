
<?php
function redirect(){
  header("Location: http://localhost");
}

require_once('controllers/DatabaseController.php');
  $requestType = $_SERVER['REQUEST_METHOD'];
  switch ($requestType){
    case 'POST':
      $postParameters = file_get_contents('php://input');
      $arrayParams = str_replace("+", " ", $postParameters);
      $arrayParams = explode("&", $arrayParams);

      $fullname = filter_var($arrayParams[0], FILTER_SANITIZE_STRING);
      $age = filter_var($arrayParams[1], FILTER_SANITIZE_STRING);
      $address = filter_var($arrayParams[2], FILTER_SANITIZE_STRING);

      $firstAndLastName = explode(" ", $fullname);

      $firstName = $firstAndLastName[0];
      $firstName = str_replace("name=", "", $firstName);
      $address = str_replace("address=", "", $address);
      $age = str_replace("age=", "", $age);
      $lastName = $firstAndLastName[1];

      $dbConnection = new DatabaseController();
      $connection = $dbConnection->connect();
      $query = "INSERT INTO userdata (FirstName, LastName, Age, Address)".
               "VALUES('$firstName', '$lastName', '$age', '$address')";
      $dbConnection->sendQuery($connection, $query, $requestType);
      redirect();
      break;
    case 'GET':
      $dbConnection = new DatabaseController();
      $connection = $dbConnection -> connect();
      $query = "select * from userData";
      $dbConnection->sendQuery($connection, $query, $requestType);
      break;
    default :
      echo 'No functional method defined';
  }
