<?php require("class/Github.php");

$name = filter_input(INPUT_GET, 'name', FILTER_SANITIZE_STRING);

if ($name) {
    // Remove spaces
    $name = str_replace(' ','',$name);

    // Fetch user repos
    $user = Github::getUser($name);

    // Json output
    echo json_encode($user);

} else {
    // Fetch most starred repositories
    $topRepos = Github::getTopRepositories();

    // Json output
    echo json_encode($topRepos);
}





