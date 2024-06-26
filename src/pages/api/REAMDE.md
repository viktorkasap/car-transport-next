### Rapid Api example

```ts
    const url = 'https://us-zip-code-information.p.rapidapi.com/?zipcode=30043';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1234567890',
            'x-rapidapi-host': 'us-zip-code-information.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
```

```php
<?php
$ACCESS_CONTROL_ALLOW_ORIGIN = 'https://abplogistics.site';
$X_RAPID_API_KEY = '1234567890';

// header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET'); 
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization');
header('Content-Type: application/json');

// ERRORS LOGGING
ini_set('log_errors', 1);
ini_set('error_log', '/home/u676253295/domains/abplogistics.site/public_html/_cdn/api/error_log.txt');

// ERRORS REPORT
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

/**
 * ZIP Request
 */
function getZipRequest($client, $xRapidAPIKey, $zip) {
    // Link - https://rapidapi.com/dkr73/api/us-zip-code-information
    
    try {
        $url = 'https://us-zip-code-information.p.rapidapi.com/?zipcode=';
        $xRapidAPIHost = 'us-zip-code-information.p.rapidapi.com';

        $response = $client->request('GET', $url.$zip, [
            'headers' => [
                'X-RapidAPI-Host' => $xRapidAPIHost,
                'X-RapidAPI-Key' => $xRapidAPIKey,
            ],
        ]);
        
        echo $response->getBody();
        exit;
    }
    catch (\GuzzleHttp\Exception\GuzzleException $e) {
        error_log($e->getMessage());
        http_response_code(500);
        
        $responseBody = $e->getResponse()->getBody()->getContents();
        $decodedResponse = json_decode($responseBody, true);
        $errorMessage = isset($decodedResponse['message']) ? $decodedResponse['message'] : 'An error occured while executing the request.';
    
        echo json_encode(['error' => $errorMessage]);
        exit;
    }
}

/**
 * Car Makes Request
 */
function getCarMakesRequest($client, $xRapidAPIKey) {
    // Link - https://rapidapi.com/carapi/api/car-api2
    
    try {
        $url = 'https://car-api2.p.rapidapi.com/api/makes?direction=asc&sort=id';
        $xRapidAPIHost = 'car-api2.p.rapidapi.com';

        $response = $client->request('GET', $url, [
            'headers' => [
                'X-RapidAPI-Host' => $xRapidAPIHost,
                'X-RapidAPI-Key' => $xRapidAPIKey,
            ],
        ]);
        
        echo $response->getBody();
        exit;
    }
    catch (\GuzzleHttp\Exception\GuzzleException $e) {
        error_log($e->getMessage());
        http_response_code(500);
        
        $responseBody = $e->getResponse()->getBody()->getContents();
        $decodedResponse = json_decode($responseBody, true);
        $errorMessage = isset($decodedResponse['message']) ? $decodedResponse['message'] : 'An error occured while executing the request.';
    
        echo json_encode(['error' => $errorMessage]);
        exit;
    }
}

/**
 * Car Models Request
 */
function getCarModelsRequest($client, $xRapidAPIKey, $make, $year) {
    // Link - https://rapidapi.com/carapi/api/car-api2
    
    try {
        $url = 'https://car-api2.p.rapidapi.com/api/models?make='.$make.'&sort=name&direction=asc&year='.$year.'&verbose=yes';
        $xRapidAPIHost = 'car-api2.p.rapidapi.com';

        $response = $client->request('GET', $url, [
            'headers' => [
                'X-RapidAPI-Host' => $xRapidAPIHost,
                'X-RapidAPI-Key' => $xRapidAPIKey,
            ],
        ]);
        
        echo $response->getBody();
        exit;
    }
    catch (\GuzzleHttp\Exception\GuzzleException $e) {
        error_log($e->getMessage());
        http_response_code(500);
        
        $responseBody = $e->getResponse()->getBody()->getContents();
        $decodedResponse = json_decode($responseBody, true);
        $errorMessage = isset($decodedResponse['message']) ? $decodedResponse['message'] : 'An error occured while executing the request.';
    
        echo json_encode(['error' => $errorMessage]);
        exit;
    }
}

/**
 * HELPERS
 */
function logs(...$args) {
  foreach ($args as $arg) {
        print_r($arg);
    }
}

/**
 * Init
 */
$allowedDomains = ['http://localhost:4000', 'https://abp-logistics.webflow.io', $ACCESS_CONTROL_ALLOW_ORIGIN];
$origin = $_SERVER['HTTP_ORIGIN'];
$allowed = false;

if (in_array($origin, $allowedDomains)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    $allowed = true;
} 

if ($_SERVER['REQUEST_METHOD'] == 'GET' && $allowed) {
    $requestHandled = false;
    $zip = isset($_GET['zip']) ? filter_var($_GET['zip'], FILTER_VALIDATE_INT) : '';
    $make = isset($_GET['models-of']) ? htmlspecialchars($_GET['models-of']) : '';
    $year = isset($_GET['year']) ? filter_var($_GET['year'], FILTER_VALIDATE_INT) : '';
    
    if (!$requestHandled && $zip) {
        getZipRequest($client, $X_RAPID_API_KEY, $zip);
        $requestHandled = true;
    }
    
    if (!$requestHandled && isset($_GET['makes'])) {
        getCarMakesRequest($client, $X_RAPID_API_KEY);
        $requestHandled = true;
    }
    
    if (!$requestHandled && $make) {
        getCarModelsRequest($client, $X_RAPID_API_KEY, $make, $year);
        $requestHandled = true;
    } 
    
    
    if (!$requestHandled) {
        http_response_code(500);
        echo json_encode(['error' => 'Something went wrong']); 
        exit;
    }
}
?>
```
