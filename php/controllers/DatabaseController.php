<?php
class DatabaseController{
  CONST DATABASE_HOST = 'localhost';
  CONST DATABASE_NAME = 'formdata';
  CONST DATABASE_USER = 'clientForm';
  CONST DATABASE_PASSWORD = 'admin';
  public $dbhost;
  public $dbname;
  public $dbuser;
  public $dbpassword;

  function __construct(){
    $this->dbhost = self::DATABASE_HOST;
    $this->dbname = self::DATABASE_NAME;
    $this->dbuser = self::DATABASE_USER;
    $this->dbpassword = self::DATABASE_PASSWORD;
  }

  public function connect(){
    $connection = mysqli_connect($this->dbhost, $this->dbuser, $this->dbpassword, $this->dbname);

    if(mysqli_connect_errno()){
      echo 'Failed to connect: Error Code ->' . mysqli_connect_errno();
    } else {
      return $connection;
    }
  }

  public function sendQuery($connection, $query, $requestType){

      switch ($requestType) {
        case 'POST':
          if($connection->query($query)){
            echo 'Inserted Successfully, closing connection';
            mysqli_close($connection);
          }else{
            echo 'Insert failed, Reason: ' . $connection->error;
          }
          break;
        case 'GET' :
          $result = $connection->query($query);

          if($result->num_rows > 0){
            while($results = mysqli_fetch_array($result)){
              echo json_encode($results);
            }
            mysqli_close($connection);
          } else {
            echo 'error getting records';
          }
          break;
        default:
           echo 'no request method indicated';
          break;
      }

  }
}
