<?php
$data = json_decode(file_get_contents("php://input"), true);

$name   = $data['name'] ?? '';
$status = $data['status'] ?? '';
$count  = $data['count'] ?? '';
$text   = $data['text'] ?? '';
$time   = date("Y-m-d H:i:s");

$file = 'data.csv';

// buat file + header kalau belum ada
if (!file_exists($file)) {
    file_put_contents($file, "Nama,Status,Jumlah Tamu,Pesan,Waktu\n");
}

// sanitize CSV
$name = str_replace('"', '""', $name);
$text = str_replace('"', '""', $text);

// kalau tidak hadir → jumlah otomatis 0
if ($status === 'tidak') {
    $count = 0;
}

// format row
$row = "\"$name\",\"$status\",\"$count\",\"$text\",\"$time\"\n";

// =========================
// 🔥 BAGIAN PENTING (ANTI ERROR)
// =========================

$fp = fopen($file, 'a');

if ($fp === false) {
    http_response_code(500);
    exit("Gagal buka file");
}

// retry lock
$maxAttempts = 5;
$locked = false;

for ($i = 0; $i < $maxAttempts; $i++) {
    if (flock($fp, LOCK_EX)) {
        $locked = true;
        break;
    }
    usleep(100000); // 0.1 detik
}

if (!$locked) {
    fclose($fp);
    http_response_code(500);
    exit("File sedang sibuk");
}

// tulis data
fwrite($fp, $row);

// unlock + close
flock($fp, LOCK_UN);
fclose($fp);

echo "OK";
?>