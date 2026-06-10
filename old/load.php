<?php
$file = 'data.csv';

$result = [];

if (file_exists($file)) {
    $rows = array_map('str_getcsv', file($file));
    $header = array_shift($rows);

    foreach ($rows as $row) {
        if (count($row) === count($header)) {
            $result[] = array_combine($header, $row);
        }
    }
}

echo json_encode($result);
?>