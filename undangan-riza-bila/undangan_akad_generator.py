template = """Yth. Bapak/Ibu/Saudara/i
{nama}
Di Tempat
---------------------------
Assalamualaikum Wr. Wb.
Dengan segala kerendahan hati,
kami mengundang Bapak/Ibu/Saudara/i dan teman-teman untuk menghadiri acara,
=============
Pernikahan Riza & Nabila
=============
♥️Save The Date♥️
----------------
Pada
📅 Tanggal : 26/06/2026
🕘 Pukul : 11:00 s/d Selesai
Tempat
🏠 Lihat pada link undangan dibawah.
-----------------
Untuk detail acaranya, bisa kunjungi link berikut.👇

https://share.linkundangan.com/pernikahan-riza-nabila-8?to={url_nama}

(Note: Disarankan Menggunakan Browser Chrome)

Kami sangat berharap Bapak/Ibu/Saudara/i dan teman-teman dapat menghadiri acara tersebut,
--------------------------------
Wassalamualaikum Wr. Wb,
🙏 Hormat Kami,
Penyelenggara
"""

tamu_list = [
    "Pak Ulum",
    "Teh Oca",
    "Bu Frista",
    "Faisal",
    "Bu Prima",
    "Bubu",
    "Jenal",
    "Iduy",
    "Lisa",
    "Zamzam",
    "Nanad",
    "Emif",
    "A Ari",
    "A Eri",
    "A Fajar",
    "A Irfan",
    "Yuda",
    "Bagus",
    "Cindri",
    "Ima",
    "Iqbal",
    "Naufal",
    "Salamah",
    "Teh Kiki",
    "Teh Livia",
    "Teh Lusi",
    "Teh Nida",
    "Teh Nur",
    "Zamzam",
    "Novi",
    "Ramdhan",
    "Leni",
    "Teh Adni",
    "Pak Firman",
    "Nurul",
    "Teh Nuy",
    "Risti",
    "Teh Salma",
    "Teh Lela",
    "Vanesha",
    "Rifqi",
    "Sopian",
    "Neneng",
    "Nasya",
    "Gunawan",
    "Meysi",
    "Aul",
    "Wulan",
    "Faiq",
    "Putra",
    "Orbintoe",
    "KKN",
    "KPI",
]

hasil = []

for nama in tamu_list:
    hasil.append(template.format(nama=nama, url_nama=nama.replace(" ", "+")))

# gabungkan semua undangan
semua_undangan = "\n\n" + ("=" * 100) + "\n\n"
semua_undangan = semua_undangan.join(hasil)

# simpan ke satu file
with open("semua_undangan.txt", "w", encoding="utf-8") as f:
    f.write(semua_undangan)

print("Berhasil membuat semua_undangan.txt")
