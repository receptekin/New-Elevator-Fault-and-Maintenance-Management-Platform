
let asansorler = [];

// Asansörleri listelemek için HTML içeriğini oluşturan fonksiyon
function asansorleriListele(asansorler) {
    const asansorListesiDiv = document.getElementById('asansorListesi');
    asansorListesiDiv.innerHTML = '';

    asansorler.forEach(asansor => {
        const asansorDiv = document.createElement('div');
        asansorDiv.classList.add('kart'); // Asansör div'ine kart sınıfı eklendi

        // Eksik ürünler listesi oluşturma
        let eksikUrunlerHTML = '';
        if (asansor.eksikUrunler.length > 0) {
            eksikUrunlerHTML = `<p><strong>Eksik Ürünler:</strong> ${asansor.eksikUrunler.join(', ')}</p>`;
        }

        // Asansör bilgilerini HTML'e ekleme
        asansorDiv.innerHTML = `
            <h3>${asansor.isim}</h3>
            <p><strong>Ülke:</strong> ${asansor.ulke}</p>
            <p><strong>Şehir:</strong> ${asansor.sehir}</p>
            <p><strong>Mahalle:</strong> ${asansor.mahalle}</p>
            <p><strong>Cadde:</strong> ${asansor.cadde}</p>
            <p><strong>Durum:</strong> ${asansor.durum}</p>
            ${eksikUrunlerHTML}
        `;

        // Asansörü listeye ekleme
        asansorListesiDiv.appendChild(asansorDiv); // Oluşturulan asansör div'i asansorListesiDiv içine eklendi
    });
}

// Asansör ekleme formu 
const asansorForm = document.getElementById('asansorForm');
asansorForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Formdan verileri alma
    const isim = document.getElementById('isimInput').value;
    const ulke = document.getElementById('ulkeInput').value;
    const sehir = document.getElementById('sehirInput').value;
    const mahalle = document.getElementById('mahalleInput').value;
    const cadde = document.getElementById('caddeInput').value;
    const durum = document.getElementById('durumSelect').value;
    const eksikUrunler = document.getElementById('eksikUrunlerInput').value.split(',').map(item => item.trim());

    // Yeni asansör objesi oluştur
    const yeniAsansor = {
        id: asansorler.length + 1, // Geçici olarak id atama
        isim: isim,
        ulke: ulke,
        sehir: sehir,
        mahalle: mahalle,
        cadde: cadde,
        durum: durum,
        eksikUrunler: eksikUrunler
    };

    // Asansörü listeye ekle
    asansorler.push(yeniAsansor);

    // Formu temizle
    asansorForm.reset();

    // Yeni asansörü ekleyerek listeyi güncelle
    asansorleriListele(asansorler);
});

// Filtreleme işlemleri için olay dinleyicisi ekleme
const durumFilter = document.getElementById('durumFilter');
durumFilter.addEventListener('change', function() {
    const selectedDurum = durumFilter.value;

    // Tüm asansörler veya seçilen duruma göre filtreleme
    if (selectedDurum === 'tum') {
        asansorleriListele(asansorler);
    } else {
        const filteredAsansorler = asansorler.filter(asansor => asansor.durum === selectedDurum);
        asansorleriListele(filteredAsansorler);
    }
});

// // Sayfa yüklendiğinde asansörleri listeleme
window.addEventListener('load', () => {
    asansorleriListele(asansorler);
});
