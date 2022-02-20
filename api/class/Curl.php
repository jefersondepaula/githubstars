<?php

class Curl{

    private $url;

    public function __construct($url)
    {
        $this->url = $url;
    }

    public function curlRequest()
    {
        $headers = [
            "User-Agent: Example REST API Client"
        ];

        $curl = curl_init($this->url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_URL, $this->url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        // For debug only!
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

        $resp = curl_exec($curl);
        curl_close($curl);

        $data = json_decode($resp, true);

        return $data;
    }
}


