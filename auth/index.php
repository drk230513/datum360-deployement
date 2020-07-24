<?php
require './vendor/autoload.php';
session_start();

if (!isset($_GET['code'])) {
    $_SESSION["clientId"] = isset($_GET["clientId"]) ? $_GET["clientId"] : $_SESSION["clientId"];
    $_SESSION["clientSecret"] = isset($_GET["clientSecret"]) ? $_GET["clientSecret"] : $_SESSION["clientSecret"];
    $_SESSION["prefix_url"] = isset($_GET["prefix_url"]) ? $_GET["prefix_url"] : $_SESSION["prefix_url"];
}

$clientId = $_SESSION["clientId"];
$clientSecret = $_SESSION["clientSecret"];
$prefix_url = $_SESSION["prefix_url"];  

$provider = new \League\OAuth2\Client\Provider\GenericProvider([
    'clientId'                => $clientId,    // The client ID assigned to you by the provider
    'clientSecret'            => $clientSecret,   // The client password assigned to you by the provider
    'redirectUri'             => "http://datum360.azurewebsites.net/auth/index.php",
    'urlAuthorize'            => "https://$prefix_url.acl360.io/oauth2/authorize",
    'urlAccessToken'          => "https://$prefix_url.acl360.io/oauth2/token",
    'urlResourceOwnerDetails' => '',
    'scopes'                  => array("$prefix_url-pim360")
]);

// If we don't have an authorization code then get one
if (!isset($_GET['code'])) {

    // Fetch the authorization URL from the provider; this returns the
    // urlAuthorize option and generates and applies any necessary parameters
    // (e.g. state).
    $authorizationUrl = $provider->getAuthorizationUrl();

    // Get the state generated for you and store it to the session.
    $_SESSION['oauth2state'] = $provider->getState();

    // Redirect the user to the authorization URL.
    header('Location: ' . $authorizationUrl);
    exit;

// Check given state against previously stored one to mitigate CSRF attack
} 

// elseif (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {

//     unset($_SESSION['oauth2state']);
//     exit('Invalid state');

// }

else {

    try {

        // Try to get an access token using the authorization code grant.
        $accessToken = $provider->getAccessToken('authorization_code', [
            'code' => $_GET['code']
        ]);

        // We have an access token, which we may use in authenticated
        // requests against the service provider's API.
        
        $cccToken = 'Bearer ' . $accessToken->getToken();
        
        
        
        // $cookie_name = "b_token";
        // $cookie_value = $cccToken;
        // setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
        
        
        
        // echo $accessToken->getRefreshToken() . "\n";
        // echo $accessToken->getExpires() . "\n";
        // echo ($accessToken->hasExpired() ? 'expired' : 'not expired') . "\n";

        // Using the access token, we may look up details about the
        // resource owner.
        // $resourceOwner = $provider->getResourceOwner($accessToken);

        // var_export($resourceOwner->toArray());

        // // The provider provides a way to get an authenticated API request for
        // // the service, using the access token; it returns an object conforming
        // // to Psr\Http\Message\RequestInterface.
        // $request = $provider->getAuthenticatedRequest(
        //     'GET',
        //     'https://example.com/oauth2/lockdin/resource',
        //     $accessToken
        // );

    } catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {

        // Failed to get the access token or user details.
        exit($e->getMessage());

    }

}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="display: inline-block;
    position: absolute;
    padding: 20px;
    width: 500px;
    white-space: normal;
    word-break: break-all;
    font-size: 9px;
">
        <?php 
        // echo "<pre>"; 
        echo $cccToken;
        ?>
        
    </div>
    
    <script>
        localStorage.setItem('b_token', '<?php echo $cccToken;?>');
    </script>
</body>
</html>
