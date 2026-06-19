import urllib.parse

# Daftar tamu undangan
tamu_list = [
    "Mas Diki",
    "Nikko",
    "Hendra",
    "Kiki",
    "Leo",
    "Mas Agung",
    "Silvia",
    "Ajay",
    "Farhan",
    "Dr. Hari",
    "Eko",
    "Rivan",
    "Aldi",
    "Agam",
    "Adit",
    "Aldi",
    "Darry",
    "Hilman",
    "Roihan",
    "Genta",
    "Ciyun",
    "Yudha",
    "Akbar",
    "Ariya",
    "Helma",
    "Bobi",
    "Ning Ratih",
    "Riswan",
    "Zain",
    "Matahari",
    "Ewok",
    "Faisal",
    "Angga",
    "Dea",
    "Hafidz",
    "Harry",
    "David",
    "Nova",
    "Weli",
    "Nizar",
    "Sugeng",
    "Kiwah",
    "Iqbal",
    "Utay",
    "Mughni",
    "Zepri",
    "Frida",
    "Ical",
    "Harry Kurniawan",
]

BASE_URL = "https://bilasnproject.biz.id/undangan-riza-bila/?to="


def generate_pesan(nama: str) -> str:
    nama_encoded = urllib.parse.quote(nama)
    link = f"{BASE_URL}{nama_encoded}"

    pesan = f"""Assalamu'alaikum warahmatullahi wabarakatuh

Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i *{nama}* untuk hadir dalam acara pernikahan kami:

*Riza Irsyad, S.Kom.*
&
*Nabila Syahidah N, S.H.*

📿 *Akad Nikah*
🗓️ Jumat, 26-06-26
🕘 09.00 WIB

🎊 *Resepsi Pernikahan*
🗓️ Minggu, 28 Juni 2026
🕐 15.30 – Selesai
📍 Magma Cafe Bandung
Bandasari, Kec. Cangkuang, Kabupaten Bandung, Jawa Barat

Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu pada hari bahagia kami.

Untuk detail undangan digital dan konfirmasi kehadiran (RSVP), silakan akses:
{link}

Atas perhatian dan doa yang diberikan, kami ucapkan terima kasih.

Wassalamu'alaikum warahmatullahi wabarakatuh
Hormat kami,
🤍 *Riza & Nabila*"""
    return pesan


def main():
    print("=" * 60)
    print("GENERATOR UNDANGAN PERNIKAHAN RIZA & NABILA")
    print("=" * 60)

    # Generate semua undangan ke file teks
    with open("undangan_semua.txt", "w", encoding="utf-8") as f:
        for nama in tamu_list:
            pesan = generate_pesan(nama)
            f.write(f"{'='*60}\n")
            f.write(f"UNDANGAN UNTUK: {nama}\n")
            f.write(f"{'='*60}\n")
            f.write(pesan)
            f.write("\n\n")

    print(f"✅ Total {len(tamu_list)} undangan berhasil digenerate!")
    print("📄 Semua undangan tersimpan di: undangan_semua.txt")
    print()

    # Preview 1 undangan
    print("📋 PREVIEW UNDANGAN (contoh untuk tamu pertama):")
    print("-" * 60)
    print(generate_pesan(tamu_list[0]))
    print("-" * 60)

    # Generate juga file per-tamu (opsional)
    print()
    print("Mau generate file per tamu juga? (y/n): ", end="")
    jawab = input().strip().lower()
    if jawab == "y":
        import os

        os.makedirs("undangan_per_tamu", exist_ok=True)
        for nama in tamu_list:
            nama_file = nama.replace(" ", "_").replace("/", "-").replace("&", "dan")
            with open(f"undangan_per_tamu/{nama_file}.txt", "w", encoding="utf-8") as f:
                f.write(generate_pesan(nama))
        print(f"✅ {len(tamu_list)} file tersimpan di folder: undangan_per_tamu/")


if __name__ == "__main__":
    main()
