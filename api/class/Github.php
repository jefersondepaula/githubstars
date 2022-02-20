<?php

require('Curl.php');

class Github
{
    public static function getTopRepositories()
    {

        $curl = new Curl("https://api.github.com/search/repositories?q=stars:%3E1&sort=stars");
        $users = $curl->curlRequest();

        $output = [];

        foreach ($users['items'] as $key => $value)
        {
            $output[$key]['stars'] = $value['stargazers_count'];
            $output[$key]['name'] = $value['owner']['login'];
            $output[$key]['avatar'] = $value['owner']['avatar_url'];
            $output[$key]['link'] = $value['html_url'];
        }

        return $output;
    }

    public static function getUser($user, $sortByStar = true)
    {
        $curl = new Curl("https://api.github.com/users/$user/repos?per_page=100");
        $output = $curl->curlRequest();

        if (count($output)>0 && isset($output[0]['id'])) {

            if ($sortByStar) {

                usort($output,function($first,$second){
                    return $first['stargazers_count'] < $second['stargazers_count'];
                });
            }

            return $output;

        } else {

            return 'user not found';
        }
    }
}