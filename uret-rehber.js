/* Gizli Madde — Rehber makaleleri üretici (rehber/*.html)
   Kullanim: node uret-rehber.js   */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'rehber');
const SITE = 'https://gizli-madde.onrender.com';
const TAR = '21 Ekim 2026';

const makaleler = [
{
  slug: 'kira-zam-orani',
  baslik: 'Kira Zam Oranı Yasal Sınırı: "TÜFE’nin 3 Katı" Maddesi Ne Demek?',
  aciklama: 'Kira artışında yasal sınır nedir? TBK m.344 ve güncel TÜFE oranı (Ekim 2026: %31,49). Sözleşmedeki hileli zam maddeleri ve itiraz yolu.',
  lead: 'Kira sözleşmelerinde en pahalı sürpriz genelde zam maddesinde saklıdır. "TÜFE’nin 3 katı", "piyasa koşullarına göre", "tarafların anlaşmasına bağlı" gibi ifadeler, bir yıl boyunca cebinizden on binlerce lira çıkarabilir. İyi haber: bunların büyük bölümü hukuka aykırı.',
  ozet: [
    'Kira artışı yasal tavanı = TÜİK’in <strong>12 aylık TÜFE değişim oranı</strong> (Türk Borçlar Kanunu m.344).',
    '<strong>Ekim 2026</strong> için uygulanabilecek en yüksek artış: <strong>%31,49</strong>.',
    'Sözleşmede bu sınırın üzerinde bir oran kararlaştırılsa bile, fazla kısım geçersizdir.',
    'Fazla alınan zam, <strong>6 ay</strong> içinde geri istenebilir.'
  ],
  bolumler: [
    { h2: 'Yasal sınır tam olarak nedir?', html:
      '<p>6098 sayılı Türk Borçlar Kanunu’nun 344. maddesine göre, yenilenen kira yılında kiraya veren, kira bedelini <strong>bir önceki kira yılının 12 aylık ortalama TÜFE değişim oranını aşmamak üzere</strong> artırabilir. Yani oran serbest değil; tavan TÜİK tarafından açıklanan enflasyon verisidir.</p>' +
      '<p>Hangi ayın oranı esas alınır? Sözleşmenizin <strong>yenilendiği aydan bir önceki ayda</strong> açıklanan 12 aylık TÜFE ortalaması. Her ay değişir:</p>' +
      '<table><tr><th>Yenileme ayı</th><th>Uygulanabilecek en yüksek artış</th></tr>' +
      '<tr><td>Haziran 2026</td><td>%33,60</td></tr>' +
      '<tr><td>Eylül 2026</td><td>%31,79</td></tr>' +
      '<tr><td>Ekim 2026</td><td><strong>%31,49</strong></td></tr></table>' +
      '<p>Oran her ay TÜİK tarafından güncellenir; sözleşme yenilemeden önce güncel değeri kontrol etmeniz gerekir.</p>'
    },
    { h2: 'Sözleşmede en sık görülen 4 hileli zam ifadesi', html:
      '<table><tr><th>Sözleşmede yazan</th><th>Gerçekte ne anlama gelir</th></tr>' +
      '<tr><td>"Zam oranı TÜFE’nin 2/3 katı uygulanır"</td><td>Yasal tavanın 3 katı. Fazla kısım geçersizdir; tavan uygulanır.</td></tr>' +
      '<tr><td>"Artış oranı piyasa koşullarına göre belirlenir"</td><td>Belirsiz şart. Hâkim, TÜFE sınırını aşmamak üzere hakkaniyete göre belirler.</td></tr>' +
      '<tr><td>"Yıllık %50 zam yapılacaktır"</td><td>Tavanın üzerinde sabit oran. Geçersizdir.</td></tr>' +
      '<tr><td>"Aylık kira her yıl X lira artırılır"</td><td>Sabit tutarlı artışta da TÜFE tavanı aşılıyorsa fazlası geçersizdir.</td></tr></table>' +
      '<p><strong>Unutmayın:</strong> Sözleşmede fazla oran yazması, o oranı ödemek zorunda olduğunuz anlamına gelmez. Hukuk, tavanı emredici kural olarak korur.</p>'
    },
    { h2: 'Fazla zam ödediyseniz ne yapmalısınız?', html:
      '<ol>' +
      '<li><strong>İtiraz süresi:</strong> Kiraya veren, kira bedelini zam döneminden önce yazılı olarak bildirmek zorundadır. Bildirim yapılmadan ödenen bedel, protesto edilmeden <strong>5 iş günü içinde</strong> ödenirse zam tutarı ödenmiş sayılır.</li>' +
      '<li><strong>Ödediğiniz farkı geri isteyin:</strong> Fazla ödediğiniz kısım için <strong>6 ay</strong> içinde dava açabilir veya ihtarname gönderebilirsiniz.</li>' +
      '<li><strong>Sözleşmeyi taratın:</strong> Maddede hangi ifadenin geçtiğini net görmeniz, itirazınızın dayanağını oluşturur. <a href="/">Gizli Madde</a> ile sözleşmenizi yükleyin, zam maddesi orijinal metninde işaretlensin.</li>' +
      '</ol>'
    }
  ],
  sss: [
    { q: 'Sözleşmede zam oranı hiç yazılmazsa ne olur?', a: 'Oran kararlaştırılmamışsa hâkim, TÜFE tavanını aşmamak üzere hakkaniyete göre bir oran belirler. Yani ev sahibi "seneye ne istersem o" diyemez.' },
    { q: 'Beş yılı aşan sözleşmelerde durum nedir?', a: 'TBK m.344/3 uyarınca, beş yıldan uzun süren sözleşmelerde kira bedeli, emsal kiralar ve hakkaniyet kuralları gözetilerek yeniden belirlenebilir. Bu durumda tavan mutlak değildir.' },
    { q: 'İşyeri kiralarında da TÜFE sınırı var mı?', a: 'Çatılı işyerlerinde TÜFE tavanı uygulanır. Tacir veya tüzel kişilikler arasındaki bazı işyeri kiralarında dönem dönem istisnai düzenlemeler getirilmiştir; net durum için güncel mevzuata bakılmalıdır.' }
  ]
},
{
  slug: 'depozito-kac-ay',
  baslik: 'Depozito Kaç Aylık Alınabilir? Hukuki Sınır ve İade Kuralları',
  aciklama: 'Konut kira sözleşmesinde depozito yasal sınırı nedir? TBK m.342 gereği 3 ay kuralı, nemalandırma ve depozito iadesi süreçleri.',
  lead: 'Depozito, kiracının cebinden çıkan ilk büyük tutardır ve çoğu kişi ne kadar alınabileceğini bilmez. Elinizdeki rakam yasal sınırın üzerindeyse, fazlasını talep etme hakkınız vardır.',
  ozet: [
    'Depozito en fazla <strong>3 aylık kira bedeli</strong> olabilir (TBK m.342).',
    'Depozito <strong>Türk lirası</strong> olarak alınır; döviz cinsinden kararlaştırılamaz.',
    'Kiraya verende <strong>3 yıl süreyle saklanır ve nemalandırılır.</strong>',
    'Sözleşme bittiğinde, haklı sebep yoksa <strong>eksiksiz iade edilir.</strong>'
  ],
  bolumler: [
    { h2: '3 ay sınırı ne anlama geliyor?', html:
      '<p>Depozito, kira bedelinin <strong>en fazla 3 katı</strong> olabilir. Örnek: aylık 20.000 TL’lik bir ev için en fazla 60.000 TL depozito istenebilir.</p>' +
      '<p>Uygulamada en sık karşılaşılan ihlaller:</p>' +
      '<ul>' +
      '<li><strong>6 ay, 12 ay depozito</strong> istenmesi — yasal sınırın 2-4 katı.</li>' +
      '<li><strong>Döviz cinsinden</strong> (dolar/euro) depozito — TL dışında kararlaştırılamaz.</li>' +
      '<li><strong>"Son ay kirası depozitodan düşülür</strong>" yazması — bu, depozitoyu değil, son ayın kirayı ortadan kaldırır; ayrıca depozito da talep edilemez.</li>' +
      '</ul>'
    },
    { h2: 'Depozito nemalandırılır mı, nasıl?', html:
      '<p>Evet. Kanun, depozitonun kiraya verende <strong>3 yıl süreyle saklanmasını ve nemalandırılmasını</strong> şart koşar. Yani depozito, faiz getirmeyen bir tutar değildir.</p>' +
      '<p>Nemalandırma için depozitonun <strong>bankada bloke edilmesi</strong> gerekir. Elinizdeki sözleşmede "depozito elde tutulur" veya "nakit teslim edilir" gibi ifadeler varsa, bloke edilmesini talep edin. Bu hem paranızın güvende olmasını sağlar hem de faiz kaybını önler.</p>' +
      '<div class="card" style="border-left:3px solid var(--amb)"><strong>⚠️ Dikkat:</strong> Depozito “kira bedelinin bir kısmıdır” diye sunulsa bile, kiraya veren onu keyfi şekilde kesemez. Ancak kiracının yarattığı gerçek ve ispatlanabilir zarar, depozitodan mahsup edilebilir.</div>'
    },
    { h2: 'Depozito ne zaman ve nasıl iade edilir?', html:
      '<p>Sözleşme sona erdiğinde, kiracı taşınmazı <strong>eksiksiz ve eski durumunda</strong> iade etmekle yükümlüdür. Normal kullanım sonucu oluşan yıpranma (boya, küçük çizikler) <strong>zarar sayılmaz</strong>; bunlar için depozito kesilemez.</p>' +
      '<p>Kesinti talep ediliyorsa, kiraya verenin <strong>fiili zararı belgelemesi</strong> gerekir: fatura, fotoğraf, ustadan alınan teklif. Belge yoksa kesinti geçersizdir.</p>' +
      '<p>İade reddediliyorsa yazılı ihtarname gönderin; hâlâ dönüş yoksa Sulh Hukuk Mahkemesi’ne başvurulabilir.</p>'
    }
  ],
  sss: [
    { q: 'Emlakçı da depozito alabilir mi?', a: 'Evet, ancak depozito kiraya verene aittir. Emlakçı aracılık hizmet bedelini ayrıca ve yasal sınır içinde alır. Depozito ile komisyonu karıştırmayın.' },
    { q: 'Aidat depozitodan düşülebilir mi?', a: 'Aidat borcu, aidatın tahsil edildiği dönemde ödenmelidir. Depozito, sözleşme sonunda yapılacak mahsup için saklanır; aidat için ayrıca davranılır.' },
    { q: 'Ev sahibi "komşuya zarar verdin" derse depozito kesilir mi?', a: 'Kesinti için ortak alanda yarattığınız gerçek bir zararın belgelenmesi gerekir. İddia yeterli değildir; fatura veya tutanak şarttır.' }
  ]
},
{
  slug: 'kira-fesih-ihbar-suresi',
  baslik: 'Kira Sözleşmesinde Fesih İhbar Süresi: 1 Ay mı, 15 Gün mü?',
  aciklama: 'Konut kiralarında fesih bildirimi ne zaman yapılır? TBK m.347 uyarınca kira dönem sonuna en az 15 gün önce bildirim kuralı ve yaygın yanılgılar.',
  lead: 'Kiralayan da kiracı da sözleşmeyi sebepsiz feshedebilir — ama bunu doğru zamanda bildirmek şartıyla. Yanlış bildirim süresi, bir kira dönemi daha evde kalmanıza mal olabilir.',
  ozet: [
    'Konut kiralarında fesih bildirimi <strong>kira dönem sonuna en az 15 gün önce</strong> yapılır (TBK m.347).',
    'Bildirim <strong>yazılı</strong> olmalı; ihtarname veya noter kanalıyla en güvenlisi.',
    'Otomatik uzama maddesi olsa bile <strong>fesih hakkı korunur.</strong>',
    'İşyeri kiraları farklı kurallara tabidir (uzun süre, fesih şartları).'
  ],
  bolumler: [
    { h2: '15 gün kuralı nasıl işler?', html:
      '<p>Türk Borçlar Kanunu m.347’ye göre, kira sözleşmesini sona erdirmek isteyen taraf, <strong>kira dönem sonuna en az 15 gün önce</strong> karşı tarafa bildirimde bulunmalıdır. Bildirim, dönem sonundan daha erken yapılırsa da geçerlidir; asıl olan, dönem sonuna 15 günden az kala yapılmamasıdır.</p>' +
      '<p><strong>Örnek:</strong> Sözleşmeniz 31 Ağustos’ta bitiyorsa, fesih bildirimini en geç <strong>16 Ağustos</strong>’ta tarafınıza ulaşmış olmalıdır. 20 Ağustos’ta gelen bildirim, dönem sonundan 11 gün önce demektir ve dönem sonu için geçersiz sayılır — dönem otomatik uzar.</p>' +
      '<div class="card" style="border-left:3px solid var(--red)"><strong>❗ Yaygın yanılgı:</strong> İnternette sıkça yazan "fesih için 1 ay önce bildirim" bilgisi, konut kiraları için doğru değildir. Konutta yasal asgari süre <strong>15 gündür.</strong></div>'
    },
    { h2: 'Otomatik uzama maddesi varsa ne olacak?', html:
      '<p>Belirsiz süreli kira sözleşmeleri, sürenin bitiminde <strong>kendiliğinden uzar</strong> (TBK m.343). Sözleşmede "süre bitiminde kendiliğinden yenilenir" yazması bu kuralı değiştirmez.</p>' +
      '<p>Kritik nokta: Uzama gerçekleşmiş olsa bile fesih hakkınız durmaz. Bildirimi süresi içinde yaptığınızda, uzayan dönem de sona erer.</p>' +
      '<p>Tersi de geçerlidir: Ev sahibi, otomatik uzamayı gerekçe gösterip "seneye çıkamazsın" diyemez. Süreli fesih bildirimi yeterlidir.</p>'
    },
    { h2: 'Bildirimin güvenli yolları', html:
      '<ul>' +
      '<li><strong>Noter ihtarnamesi:</strong> En güçlü delil. Tarih kesindir, tebliğ kaydı bellidir.</li>' +
      '<li><strong>Kayıtlı gönderi (Taahhütlü/Kargo):</strong> Ucuz ve geçerli; teslim kaydı saklanmalıdır.</li>' +
      '<li><strong>Yazılı ve imzalı tutanak:</strong> Karşı taraf imzalarsa delil değeri yüksektir.</li>' +
      '<li><strong>WhatsApp/e-posta:</strong> Tek başına yeterli sayılmayabilir; ama ek delil olarak işe yarar. Yazılı ve tarihli olsun.</li>' +
      '</ul>' +
      '<p>Bildirim metninde: sözleşme tarihi, taşınmazın adresi, fesih tarihi ve dönem sonu açıkça yazmalıdır.</p>'
    }
  ],
  sss: [
    { q: 'Kiracı, ev sahibinden habersiz çıkabilir mi?', a: 'Hayır. Süre içinde yapılan yazılı bildirim şarttır. Süre tutturulamazsa bir kira dönemi daha kira bedeli ödemekle yükümlü olabilirsiniz.' },
    { q: 'Acil bir durum olursa (taşınma, iş değişikliği) erken çıkılabilir mi?', a: 'Yalnızca kanunda öngörülen istisnai hallerde (ör. tahliye kararına itiraz süresi vb.) farklı kurallar uygulanır. Olağan durumda süre kuralı geçerlidir.' },
    { q: 'İşyeri kiralarında da 15 gün mü?', a: 'Hayır. İşyeri kiralarında süre ve fesih şartları farklıdır; kiralayanın fesih hakkının sınırı da konuttan farklıdır. İşyeri sözleşmelerinde mutlaka ayrı değerlendirme yapılmalıdır.' }
  ]
},
{
  slug: 'emlakci-komisyonu',
  baslik: 'Emlakçı Komisyonu Yasal Oranı: Kim Ne Kadar Öder?',
  aciklama: 'Kiralama ve satışta emlak komisyonu yasal sınırı nedir? Taşınmaz Ticareti Hakkında Yönetmelik’e göre hizmet bedeli limitleri ve yetki belgesi kontrolü.',
  lead: 'Emlak komisyonu, sözleşmenin en görünür maliyetidir — ama çoğu kişi yasal sınırın ne olduğunu bilmez. Bilinçli müzakere, tek bir cümleyle binlerce lira kazandırabilir.',
  ozet: [
    'Kiralama işlemlerinde hizmet bedeli, <strong>KDV hariç 1 aylık kira bedelini aşamaz.</strong>',
    'Satış işlemlerinde taraflardan alınan toplam hizmet bedeli <strong>%4’ü aşamaz.</strong>',
    'Tutarın <strong>kimin tarafından, hangi oranda</strong> ödeneceği tarafların anlaşmasına bağlıdır.',
    'Yetki belgesi olmayan kişi/şirket aracılık yapamaz; komisyon talebi geçersizdir.'
  ],
  bolumler: [
    { h2: 'Kiralama ve satışta sınır ne kadar?', html:
      '<table><tr><th>İşlem</th><th>Yasal üst sınır</th><th>Dayanak</th></tr>' +
      '<tr><td><strong>Kiralama</strong></td><td>KDV hariç <strong>1 aylık kira bedeli</strong> (taraflardan toplam)</td><td>Taşınmaz Ticareti Hakkında Yönetmelik</td></tr>' +
      '<tr><td><strong>Satış</strong></td><td>Toplam satış bedelinin <strong>%4’ü</strong></td><td>Aynı yönetmelik</td></tr></table>' +
      '<p>Kiralama işleminde bu tutar genellikle kiracı ile ev sahibi arasında <strong>paylaştırılır</strong> (örneğin yarısını kiracı öder). Ancak paylaştırmada zorunlu bir oran yoktur: taraflar anlaşarak farklı bir dağılım belirleyebilir. Ödemeyi üstleneceğiniz oranı <strong>imzadan önce</strong> netleştirmeniz gerekir.</p>'
    },
    { h2: 'Yasal olmayan ne gibi talepler var?', html:
      '<ul>' +
      '<li><strong>"Yıllık kiranın %10’u komisyon"</strong> — yıllık kira üzerinden hesap, sınırın üzerindedir. Sınır 1 aylık kira bedelidir.</li>' +
      '<li><strong>"Kiracı + ev sahibi ayrı ayrı 1’er aylık ödesin"</strong> — bu toplam 2 aylık eder; yönetmelikteki sınır toplam üzerinden okunur.</li>' +
      '<li><strong>"Tapu, dosya, kayıt parası"</strong> — yönetmelikte belirtilmeyen ek ücretler talep edilemez.</li>' +
      '<li><strong>Yetki belgesi olmayan kişilerden</strong> alınan komisyon hukuki dayanaktan yoksundur.</li>' +
      '</ul>'
    },
    { h2: 'İmzadan önce 3 kontrol', html:
      '<ol>' +
      '<li><strong>Yetki belgesi:</strong> Emlakçının Taşınmaz Ticareti Yetki Belgesi’ni görün. Yetki belgesi olmayan hiçbir kişi aracılık ücreti alamaz.</li>' +
      '<li><strong>Yazılı hizmet sözleşmesi:</strong> Aracılık, yazılı hizmet sözleşmesine dayanır. Ağızdan söylenen komisyon, yazılı olmayan tutarla çelişirse yazılı olan esastır.</li>' +
      '<li><strong>Sözleşmenizin kendisi:</strong> Kira sözleşmenizdeki depozito, zam ve fesih maddelerini de kontrol edin — <a href="/">Gizli Madde</a> 30 saniyede işaretler.</li>' +
      '</ol>'
    }
  ],
  sss: [
    { q: 'Komisyon ödenmezse ne olur?', a: 'Aracılık hizmeti fiilen verilmiş ve sözleşme imzalanmışsa, hizmet bedeli alacağı doğar. Bu nedenle oran ve ödeme yükümlülüğünü imzadan önce netleştirin.' },
    { q: 'Emlakçı "ev sahibi ödüyor" derse inanmalı mıyım?', a: 'Sözlü söze değil, kira sözleşmenize ve hizmet sözleşmesine bakın. Kimin ne ödeyeceği yazılı olmalıdır.' },
    { q: 'Aynı evi birden fazla emlakçı gösterirse?', a: 'Aracılık sözleşmesi hangi ofisle yapılmışsa ödeme yükümlülüğü de ona bağlıdır. Reklam/Kayıt bedeli gibi ek talepler için ayrıca dayanak sorun.' }
  ]
},
{
  slug: 'otomatik-yenileme-maddesi',
  baslik: 'Otomatik Yenileme Maddesi Nedir? Nasıl İptal Edilir?',
  aciklama: 'Kira ve abonelik sözleşmelerinde kendiliğinden uzama (otomatik yenileme) maddesi hukuki sonuçları, fesih bildirimi ve iptal yolları.',
  lead: 'Bir dönem sonunda "zaten uzadı, çıkamazsın" cevabını duymayan kiracı neredeyse yoktur. Bu ifadenin hukuki dayanağı var mı, yoksa sadece bir baskı mı? Cevap: kısmen var — ama şartlı.',
  ozet: [
    'Belirsiz süreli sözleşmeler <strong>kendiliğinden uzar</strong> (TBK m.343) — bu kanuni kuraldır.',
    'Uzama olsa bile <strong>fesih hakkı korunur</strong>; süre içinde bildirim yeterlidir.',
    'Aboneliklerde <strong>iptal prosedürü ve süreleri</strong> sözleşmede açıkça yazmalıdır.',
    'Hakim, kendiliğinden uzamayı <strong>kötüye kullanım</strong> durumunda sınırlayabilir.'
  ],
  bolumler: [
    { h2: 'Kendiliğinden uzama nasıl doğar?', html:
      '<p>Belirsiz süreli kira sözleşmeleri, sürenin bitiminde fesih bildirimi yapılmadığı takdirde <strong>kendiliğinden uzar</strong>. Sözleşmede "süre bitiminde otomatik yenilenir" yazması bu sonucu değiştirmez; bu zaten kanundan gelir.</p>' +
      '<p>Kiraya veren, uzayan dönem için kira bedelini artırmak istiyorsa, dönem bitiminden önce <strong>yazılı bildirimde</strong> bulunmak zorundadır. Bildirim yoksa eski bedel geçerlidir.</p>'
    },
    { h2: 'Uzamayı engellemek için ne yapmalı?', html:
      '<ol>' +
      '<li><strong>Sözleşmenizi takip edin:</strong> Bitiş tarihini ve bildirim süresini takvime yazın.</li>' +
      '<li><strong>Süre içinde yazılı bildirim gönderin:</strong> Konut kiralarında dönem sonuna en <strong>15 gün önce</strong> (TBK m.347).</li>' +
      '<li><strong>Delil bırakın:</strong> Noter ihtarnamesi veya teslim kaydı olan gönderi.</li>' +
      '<li><strong>Ortak tutanak:</strong> Taşınmazı teslim ederken durumu kayıt altına alın.</li>' +
      '</ol>'
    },
    { h2: 'Abonelik sözleşmelerinde durum', html:
      '<p>Elektrik, internet, üyelik ve dijital hizmetlerde otomatik yenileme maddesi sıkça kullanılır. Burada kritik nokta, <strong>iptalin ne kadar sürdüğü</strong> ve <strong>hangi kanaldan</strong> yapılabileceğidir.</p>' +
      '<p>Uygulamada en sık sorun: İptalin yalnızca "çağrı merkezinden" veya "şubeye gelinerek" yapılabilmesi. Sözleşmede böyle bir şart varsa, tüketici aleyhine bir sınırlama olup olmadığı değerlendirilmelidir; ayrıca mesafeli sözleşmelerde cayma hakkı da gündeme gelebilir.</p>' +
      '<p>Kural: <strong>Aboneliği başlatan da bitiren de sizsiniz.</strong> Sözleşmenin uzadığı varsayılarak ödeme yapılmaya devam edilirse, ödenen tutarların iadesi talep edilebilir.</p>'
    }
  ],
  sss: [
    { q: 'Ev sahibi "uzadı, zam yapacağım" diyebilir mi?', a: 'Uzama olur, ancak zam için dönem bitiminden önce yazılı bildirim gerekir. Bildirim yapılmadan zam talep edilemez; ödenen fark geri istenebilir.' },
    { q: 'Yazılı olmayan otomatik yenileme geçerli mi?', a: 'Kira sözleşmelerinde süre ve uzama koşulları <strong>yazılı şekil</strong> şartına tabidir. Yazılı olmayan uzama şartı delil sorunu doğurur.' },
    { q: 'Dijital aboneliğimi iptal etmek için ne yazmalıyım?', a: 'Kimlik, abonelik numarası, iptal talebi ve tarih. Sözleşmede belirtilen kanala yazılı olarak gönderin ve teslim kaydını saklayın.' }
  ]
},
{
  slug: 'taksitli-alisveris-tuzaklari',
  baslik: 'Taksitli Alışveriş Sözleşmesinde Karşına Çıkabilecek 5 Tuzak',
  aciklama: 'Vadeli/taksitli alışverişte dikkat edilmesi gerekenler: ayıplı ürün, vade farkı, gecikme tazminatı, cayma hakkı ve ön bilgilendirme formu (6502 sayılı TKK).',
  lead: 'Mobilya, beyaz eşya, teknoloji ürünü alırken "ayda sadece X TL" denir. Sözleşmeye imza atıldığında ise karşınıza vade farkı, gecikme faizi ve ayıplı ürün istisnaları çıkar. Bunların çoğu yasaldır — ama okunmamıştır.',
  ozet: [
    'Sözleşmede <strong>toplam ödeme tutarı</strong> açıkça yazılmalıdır; yalnızca taksit tutarı yetmez.',
    'Ayıplı üründe <strong>6502 sayılı Tüketicinin Korunması Hakkında Kanun</strong> devreye girer.',
    'Mesafeli sözleşmelerde genel olarak <strong>14 gün cayma hakkı</strong> vardır.',
    'Gecikme halinde ödenecek tazminat <strong>sınırlandırılmıştır.</strong>'
  ],
  bolumler: [
    { h2: '1) Toplam tutar yazmıyor mu?', html:
      '<p>Sözleşmede yalnızca "aylık taksit X TL, 12 taksit" yazıyorsa, <strong>toplam ödeme tutarını ve vade farkını</strong> ayrıca kontrol edin. Toplam tutarın yazmaması, tüketici bilgilendirmesinde eksikliktir.</p>' +
      '<p>Toplam tutar ile taksit tutarının çarpımı arasındaki fark = <strong>vade farkı</strong>. Bu farkı bilmeden imzalamak, sürpriz bir maliyetle karşılaşmak demektir.</p>'
    },
    { h2: '2) Ayıplı ürün çıktığında ne olur?', html:
      '<p>Ürün ayıplıysa (kusurlu, eksik, tanıtımına uymuyorsa) 6502 sayılı Kanun kapsamında şu seçenekleriniz vardır:</p>' +
      '<ul>' +
      '<li><strong>Ürünün ücretsiz onarımı</strong></li>' +
      '<li><strong>Değiştirme</strong> (aynı veya benzer ürün)</li>' +
      '<li><strong>Bedel indirimi</strong></li>' +
      '<li><strong>Sözleşmeden dönme</strong> (koşulları varsa)</li>' +
      '</ul>' +
      '<p>Satıcı, seçim hakkınızı <strong>engelleyemez</strong>. Ayrıca ücretsiz onarım için "servise siz getirin" gibi ek yükler getirilemez.</p>'
    },
    { h2: '3) Cayma hakkı: her üründe var mı?', html:
      '<p>Cayma hakkı, <strong>mesafeli sözleşmelerde</strong> (internet, telefon, kapıdan satış gibi) ve kanunda belirtilen diğer hallerde tanınır. Genel süre <strong>14 gündür</strong> ve hak, sürenin bitiminden önce açık bir bildirimle kullanılır.</p>' +
      '<p>Ancak bazı istisnalar vardır: kişisel ihtiyaç için hazırlanmış ürünler, hijyenik ürünler ve benzeri hallerde cayma hakkı bulunmayabilir. <strong>Ön bilgilendirme formunda</strong> cayma hakkınız olup olmadığı açıkça yazılmalıdır.</p>'
    },
    { h2: '4-5) Gecikme ve gizli maddeler', html:
      '<p>Taksitin zamanında ödenmemesi halinde uygulanacak gecikme tazminatı <strong>sınırlandırılmıştır</strong>; sözleşmede keyfi bir oran kararlaştırılamaz.</p>' +
      '<p>Ve en önemlisi: Sözleşmeye <strong>elle eklenmiş</strong>, basılı metinden farklı maddeler varsa, bunlar çoğu zaman basılı hükümlere tercihen uygulanır. "Sonradan yazılan bir madde var mı?" diye sözleşmenin tamamını bir kez okuyun — ya da <a href="/">Gizli Madde</a> ile taratın.</p>'
    }
  ],
  sss: [
    { q: 'Taksitli alımda ürün iade edilirse vade farkı ne olur?', a: 'Sözleşmeden dönme hâlinde ödenen bedel ve yasal faizi ile birlikte iade edilir; satıcı lehine orantısız bir vade farkı kesintisi yapılamaz.' },
    { q: 'Kredi kartı taksiti ile mağaza taksiti aynı mı?', a: 'Hayır. Bankanın uyguladığı taksit ile satıcının sunduğu vade farkı ayrı hukuki ilişkilerdir. Sözleşmede hangisinin geçerli olduğu yazmalıdır.' },
    { q: 'Sözleşmeyi okumadan imzaladım, şimdi ne yapacağım?', a: 'İmzaladığınız metnin bir kopyasını derhal isteyin. Ayıplı ürün veya haksız şart tespit edilirse, tüketici hakem heyetine veya mahkemeye başvurulabilir.' }
  ]
},
{
  slug: 'is-sozlesmesi-rekabet-yasagi',
  baslik: 'İş Sözleşmesinde Rekabet Yasağı Geçerli mi? 2 Yıl Sınırı',
  aciklama: 'İş sözleşmesinde rekabet yasağı maddesi hukuki şartları: süre sınırı, coğrafi sınır, işçi lehine tazminat ve geçersizlik hallereri (TBK m.417-419).',
  lead: 'İş sözleşmelerinde en çok korkutucu maddelerden biri rekabet yasağıdır: "Ayrıldıktan sonra 2 yıl aynı sektörde çalışamazsın." Bu madde her hâlde geçerli değildir — ama ihmal edilirse yıllarca işsiz kalabilir.',
  ozet: [
    'Rekabet yasağı <strong>ancak yazılı olursa</strong> geçerlidir.',
    'En uzun süre <strong>2 yıldır</strong>; daha uzunu geçersizdir.',
    'Coğrafi ve konu itibarıyla <strong>belirli</strong> olmalıdır.',
    'İşçinin ekonomik çıkarları <strong>makul ölçüde korunmalı</strong>; korunmuyorsa madde hükümsüzdür.'
  ],
  bolumler: [
    { h2: 'Geçerlilik için 4 şart', html:
      '<table><tr><th>Şart</th><th>Ne anlama geliyor</th></tr>' +
      '<tr><td><strong>Yazılı şekil</strong></td><td>Sözlü kararlaştırılan rekabet yasağı geçersizdir.</td></tr>' +
      '<tr><td><strong>Süre sınırı</strong></td><td>En fazla 2 yıl. 3 yıl yazan madde, 2 yıl sonra işlevsiz kalır.</td></tr>' +
      '<tr><td><strong>Belirlilik</strong></td><td>Yasak kapsamı (hangi işler, hangi bölge) açıkça tanımlanmalı.</td></tr>' +
      '<tr><td><strong>Ekonomik koruma</strong></td><td>İşçi, yasak süresince makul ölçüde tazminat almalı.</td></tr></table>'
    },
    { h2: 'Tazminat ne kadar olmalı?', html:
      '<p>Kanun, asgari bir oran vermez; ancak <strong>işçinin ekonomik çıkarlarını makul ölçüde koruyacak</strong> bir tazminatın kararlaştırılması şarttır. Tazminat yoksa ya da sembolikse, madde hakkaniyete aykırı bulunarak sınırlanabilir.</p>' +
      '<p>Uygulamada tazminat, son ücretin bir yüzdesi veya sabit bir tutar olarak belirlenir. Sözleşmede "tazminat ödenmez" yazması, maddeyi kendiliğinden geçersiz kılmaz — ama mahkemece sınırlanma ihtimalini güçlendirir.</p>' +
      '<p><strong>İpucu:</strong> Tazminatın <strong>ödeme zamanı ve biçimi</strong> de yazılmalıdır. Yıllık ödenecekse taksitler, tarihi ve güncellemesi belirtilmelidir.</p>'
    },
    { h2: 'Rekabet yasağı ihlal edilirse ne olur?', html:
      '<p>İşçi, yasağı ihlal ederse işveren şunları talep edebilir:</p>' +
      '<ul>' +
      '<li><strong>Yasağa son verilmesi</strong></li>' +
      '<li><strong>Maddi ve manevi tazminat</strong></li>' +
      '<li><strong>Rekabet yasağı ihlalinden doğan zararın giderilmesi</strong></li>' +
      '</ul>' +
      '<p>İşveren de borcunu unutmamalıdır: Tazminatı ödemediği takdirde işçi, yasakla bağlı değildir. Yani <strong>ödenmeyen tazminat, yasağı düşürür.</strong></p>'
    }
  ],
  sss: [
    { q: 'Aynı maddede kefalet ve rekabet yasağı birlikte varsa?', a: 'Her madde ayrı ayrı değerlendirilir. Rekabet yasağı geçersiz olsa bile kefalet geçerli olabilir; ikisi için ayrı ayrı inceleme gerekir.' },
    { q: 'Stajerler için de geçerli mi?', a: 'Staj ilişkisinde işçilik unsurları farklıdır. Yine de yazılı bir yasak varsa geçerliliği ayrıca değerlendirilir.' },
    { q: 'İşten ayrıldıktan sonra taşındım, yasağı ihlal sayılır mı?', a: 'Coğrafi sınır, yasağın bir koşuludur. Taşınma sonrası kapsam dışı bir bölgede çalışmak, çoğu durumda ihlal oluşturmaz.' }
  ]
},
{
  slug: 'ogrenci-ev-sozlesmesi',
  baslik: 'Öğrenci Ev Sözleşmesinde İmzalamadan Önce Bakılacak 7 Madde',
  aciklama: 'Öğrenciler için ev kira sözleşmesi rehberi: depozito, zam, fesih, aidat, demirbaş, kefil ve yazılı şekil. En sık yapılan 7 hata.',
  lead: 'İlk kez ev tutan bir öğrenci için sözleşme, "zaten herkes aynı şeyi imzalıyor" denilen bir belgedir. Oysa ilk sözleşmedeki tek madde, tüm bir yılın bütçesini belirler.',
  ozet: [
    'Depozito <strong>3 ayı</strong> geçemez; döviz cinsinden istenemez.',
    'Zam oranı <strong>TÜFE tavanını</strong> aşamaz.',
    'Fesih bildirimi <strong>15 gün önce</strong> yapılır.',
    'Aidat, demirbaş ve fatura paylaşımı <strong>yazılı</strong> olmalı.',
    'Kefil, kefaletin içeriği ve sınırı <strong>açıkça</strong> yazılmalı.'
  ],
  bolumler: [
    { h2: '1-3) Para maddeleri', html:
      '<p><strong>Depozito:</strong> En fazla 3 aylık kira bedeli. "Son ay kirası depozitodan düşülür" yazıyorsa, depozito bir daha istenemez — bu iki farklı şeydir.</p>' +
      '<p><strong>Zam:</strong> "Yıllık %X zam yapılır" yazıyorsa, oran TÜFE tavanını (Ekim 2026 için %31,49) aşamaz. Aşan kısım geçersizdir.</p>' +
      '<p><strong>Ödeme şekli:</strong> Hangi gün, hangi hesaba, hangi kanaldan ödeneceği yazılı olmalıdır. Havale/EFT masraflarını kim karşılayacak?</p>'
    },
    { h2: '4-5) Yaşam maddeleri', html:
      '<p><strong>Aidat:</strong> Apartman aidatının kim tarafından, ne kadar ödeneceği yazılmalıdır. Aidat artarsa farkı kim karşılayacak?</p>' +
      '<p><strong>Demirbaş listesi:</strong> Eve neyle girdiğinizi (buzdolabı, çamaşır makinesi, yatak vb.) listeleyin ve teslim tutanağına yazın. Sözleşme bittiğinde <strong>eksik/eğri çıkarsa</strong> tek deliliniz bu listedir.</p>' +
      '<p><strong>Hasar sınırı:</strong> Normal kullanım sonucu oluşan yıpranma sizin sorumluluğunuzda değildir. "Her çizikten kesilir" gibi bir madde varsa, bunu sınırlandırmasını isteyin.</p>'
    },
    { h2: '6-7) Hukuki maddeler', html:
      '<p><strong>Kefil:</strong> Kefalet sözleşmesi ayrı bir belgedir ve <strong>yazılı</strong> olmak zorundadır. Kefilin sorumluluğunun neyi kapsadığı (kira bedeli mi, tüm alacaklar mı) ve süresi açıkça yazılmalıdır. Aksi halde "kefil her şeyden sorumlu" denilerek genişletilmeye çalışılabilir.</p>' +
      '<p><strong>Fesih:</strong> Öğrenciye özel bir ayrıcalık tanınmış mıdır? ("Okul nakil/ mezuniyet durumunda çıkabilir") — varsa bu madde, size esneklik kazandırır. Yoksa 15 gün önce bildirim kuralı geçerlidir.</p>' +
      '<div class="card" style="border-left:3px solid var(--grn)"><strong>✅ Yapın:</strong> Sözleşmenin bir kopyasını her zaman yanınızda bulundurun. Sözleşmeyi <a href="/">Gizli Madde</a> ile taratın; depozito, zam ve fesih maddeleri 30 saniyede işaretlensin.</div>'
    }
  ],
  sss: [
    { q: 'Sözleşmeyi tek başıma okuyamıyorum, ne yapmalıyım?', a: 'Ailenizden birine, bir öğretmene veya bir hukukçuya gösterin. Ayrıca analiz aracı, tehlikeli maddeleri orijinal metninde işaretleyerek okumanızı kolaylaştırır.' },
    { q: 'Ev sahibi "evde hayvan olmaz" diyor, sözleşmeye yazılmalı mı?', a: 'Evet. Sözlü sınırlamalar, yazılı olmayan koşullar uygulamada sorun yaratır. Yaşam tarzınızı sınırlayan her kural yazılı olmalıdır.' },
    { q: 'Arkadaşımla ortak imzaladık, sorumluluk paylaşılıyor mu?', a: 'Sözleşmede aksi yazmadıkça, kira borcundan <strong>katlı sorumluluk</strong> doğabilir: her ikisi de tam borçtan sorumlu olabilir. Paylaşımı yazılı hale getirin.' }
  ]
},
{
  slug: 'elle-yazilan-madde',
  baslik: 'Sözleşmede Elle Yazılan Madde Geçerli mi? Matbu Metne Üstünlük',
  aciklama: 'Sözleşmede elle yazılmış maddelerin hukuki gücü: matbu (baskı) metinle çelişirse hangisi geçerlidir, Yargıtay uygulaması ve delil değeri.',
  lead: 'Emlak ofisinde size uzatılan sözleşmenin çoğu baskıdır — ama bir satırın kenarına kalemle bir şey karalanmıştır. O kalem satırı, çoğu zaman tüm sözleşmeden daha güçlüdür.',
  ozet: [
    'Sözleşmede <strong>elle yazılan hüküm</strong>, matbu (baskı) hükme tercihen uygulanır.',
    'Sebep: elle yazılan, <strong>tarafların son iradesini</strong> yansıtır.',
    'Bu kural <strong>her durumda mutlak değildir</strong>; içerik ve deliller birlikte değerlendirilir.',
    'Karalama/silme gibi durumlarda <strong>imza veya paraf</strong> şarttır.'
  ],
  bolumler: [
    { h2: 'Neden elle yazılan üstün?', html:
      '<p>Sözleşme, tarafların ortak iradesinin ifadesidir. Matbu metin, önceden hazırlanmış bir şablondur; elle yazılan hüküm ise <strong>o sözleşme için ayrıca kararlaştırılmış</strong> bir iradeyi gösterir. Bu nedenle Yargıtay uygulamasında, matbu hükümlerle <strong>çelişen</strong> elle yazılan hükümlerin tercihen uygulanması benimsenmiştir.</p>' +
      '<p>Örnek: Sözleşmede baskı olarak "Zam yıllık %50 yapılır" yazıyorsa, yanına elle "TÜFE oranında" not edilmiş ve taraflarca paraflanmışsa, <strong>elle yazılan esastır.</strong></p>'
    },
    { h2: 'Hangi durumlarda elle yazı işe yaramaz?', html:
      '<ul>' +
      '<li><strong>İmza/paraf yoksa:</strong> Sonradan eklendiği iddia edilen bir cümle, delil değeri taşımaz.</li>' +
      '<li><strong>Karalama varsa:</strong> Silinen/karalanan hükmün ne olduğu belirsizse, o kısım dikkate alınmaz.</li>' +
      '<li><strong>Tek taraflı eklendiyse:</strong> Yalnızca bir tarafın eklediği ve diğerinin imzalamadığı madde, bağlayıcı değildir.</li>' +
      '<li><strong>Kanuna aykırıysa:</strong> Örneğin yasal zam tavanını aşan bir elle yazı, bu kuralı delemez. Emredici kurallar her zaman üstündür.</li>' +
      '</ul>'
    },
    { h2: 'İmzadan önce 30 saniyelik kontrol', html:
      '<ol>' +
      '<li>Sözleşmenin <strong>her sayfasının altını</strong> kontrol edin: imza var mı, eksik sayfa var mı?</li>' +
      '<li><strong>Kenar boşluklarına, satır aralarına</strong> yazılmış notları okuyun.</li>' +
      '<li><strong>Silinen/karalanan</strong> kısımların okunaklılığından emin olun; belirsiz olanları düzelttirin.</li>' +
      '<li>Eklenen her elle yazının <strong>her iki tarafça da paraflandığından</strong> emin olun.</li>' +
      '</ol>' +
      '<p>Ve son adım: Sözleşmeyi <a href="/">Gizli Madde</a>’ye yükleyin — hem matbu hem elle eklenmiş maddeler, orijinal metinde kırmızıyla işaretlenir.</p>'
    }
  ],
  sss: [
    { q: 'Elle yazılan madde noterden tasdik edilirse ne olur?', a: 'Noter tasdiki, belgenin düzenlendiği gerçeğini güçlendirir. Çelişki hâlinde elle yazılanın tercih edilmesi ilkesi, içerik ve irade değerlendirmesiyle birlikte uygulanır.' },
    { q: 'Sözleşmeye sonradan madde eklendi, imzalamak zorunda mıyım?', a: 'Hayır. İmzalamadan önce maddeyi okuma ve anlama hakkınız vardır. Anlamadığınız bir maddeyi imzalamayın.' },
    { q: 'Dijital (PDF) sözleşmede bu kural işler mi?', a: 'PDF’de elle yazma kavramı farklıdır; burada daha çok <strong>tarafların eklediği özel hükümler</strong> ve imza biçimi öne çıkar. Yazılı şekil şartı dijital ortamda da aranır.' }
  ]
},
{
  slug: 'sozlesme-okuma-rehberi',
  baslik: 'Sözleşme Okuma Rehberi: İmzalamadan Önce 10 Kontrol',
  aciklama: 'Sözleşme okuma ve anlama rehberi: imzadan önce kontrol edilmesi gereken 10 madde, para maddeleri, fesih ve gizli şartlar.',
  lead: 'Hiç kimse sözleşmenin tamamını satır satır okumaz — ama 10 maddelik bir liste, tüm bir yılın maliyetini belirler. İşte imzalamadan önce geçmeniz gereken kontrol listesi.',
  ozet: [
    '<strong>10 madde</strong>: taraflar, süre, bedel, zam, depozito, fesih, ceza, kefil, hasar, ekler.',
    'Para maddeleri <strong>önce</strong> okunur; gerisi ikincildir.',
    'Sözlü söylenen her şey <strong>yazılı değilse yoktur.</strong>',
    'Anlamadığınız maddeyi <strong>imzalamayın</strong>; sormak ücretsizdir.'
  ],
  bolumler: [
    { h2: '1-4) Para ve süre maddeleri', html:
      '<ol>' +
      '<li><strong>Taraflar:</strong> Ad, soyad, TC kimlik no, adres doğru mu? Eksik veya yanlış kimlik bilgisi, ileride ispat sorunu doğurur.</li>' +
      '<li><strong>Süre:</strong> Başlangıç ve bitiş tarihi açık mı? Süre belirsiz mi?</li>' +
      '<li><strong>Kira bedeli ve ödeme şekli:</strong> Tutar, ödeme günü, hesap bilgisi yazılı mı?</li>' +
      '<li><strong>Zam maddesi:</strong> Oran ne? TÜFE tavanını (Ekim 2026: %31,49) aşıyor mu? "Piyasa koşullarına göre" gibi belirsiz ifadeler var mı?</li>' +
      '</ol>'
    },
    { h2: '5-7) Garanti ve yaptırım maddeleri', html:
      '<ol>' +
      '<li><strong>Depozito:</strong> Kaç aylık? Ne zaman, nasıl iade edilir? Bloke mi, elde mi tutuluyor?</li>' +
      '<li><strong>Fesih:</strong> Kim, ne zaman, nasıl feshedebilir? Bildirim süresi yazıyor mu (konutta 15 gün)?</li>' +
      '<li><strong>Ceza/tazminat maddeleri:</strong> Erken çıkarsan ne olur, geç ödersen ne olur? Oranlar makul mü?</li>' +
      '</ol>'
    },
    { h2: '8-10) Güvenlik maddeleri', html:
      '<ol>' +
      '<li><strong>Kefil:</strong> Kefalet sözleşmesi ayrı yazılı mı? Sorumluluk sınırı ne?</li>' +
      '<li><strong>Hasar ve demirbaş:</strong> Eve neyle girdin, neyle çıkacaksın? Teslim tutanağı var mı?</li>' +
      '<li><strong>Ekler ve elle yazılanlar:</strong> Sözleşmeye ek belgeler var mı, elle eklenmiş madde var mı, hepsi paraflanmış mı?</li>' +
      '</ol>' +
      '<div class="card" style="border-left:3px solid var(--red)"><strong>❗ En pahalı 3 madde:</strong> Zam oranı, depozito, fesih/ceza. Bu üçü, sözleşmenin toplam maliyetinin büyük kısmını oluşturur.</div>'
    }
  ],
  sss: [
    { q: 'Sözleşmeyi imzalamadan kopyasını alabilir miyim?', a: 'Evet. Sözleşmenin bir kopyasını almadan imzalamayın; ayrıca imzaladığınız kopyanın sizde kaldığından emin olun.' },
    { q: 'Anlamadığım maddeyi avukata mı göstermeliyim?', a: 'Kritik bir maddeyse evet. Ayrıca analiz aracı, tehlikeli maddeleri işaretleyerek hangi maddenin dikkat gerektirdiğini gösterir ve avukat görüşmesini daha verimli hale getirir.' },
    { q: 'Sözleşme tek sayfa olmak zorunda mı?', a: 'Hayır. Sayfa sayısı önemli değil; önemli olan <strong>tüm sayfaların imzalanmış</strong> olması ve eklerin tek tek belirtilmesidir.' }
  ]
}
];

/* ---- Şablon ---- */
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

function sayfa(m) {
  const url = `${SITE}/rehber/${m.slug}`;
  const ozetLi = m.ozet.map(x=>`<li>${x}</li>`).join('');
  const bolumler = m.bolumler.map(b=>`<h2>${b.h2}</h2>${b.html}`).join('\n');
  const sss = m.sss.map(s=>`<details><summary>${s.q}</summary><p>${s.a}</p></details>`).join('\n');
  const jsonld = JSON.stringify({
    "@context":"https://schema.org","@type":"Article","headline":m.baslik,
    "description":m.aciklama,"datePublished":"2026-10-21","inLanguage":"tr",
    "author":{"@type":"Organization","name":"Gizli Madde"},
    "publisher":{"@type":"Organization","name":"Gizli Madde","url":SITE},
    "mainEntityOfPage":{"@type":"WebPage","@id":url}
  });
  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(m.baslik)} | Gizli Madde Rehber</title>
<meta name="description" content="${esc(m.aciklama)}">
<meta property="og:title" content="${esc(m.baslik)}">
<meta property="og:description" content="${esc(m.aciklama)}">
<meta property="og:type" content="article">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/og.jpg">
<meta property="og:site_name" content="Gizli Madde">
<meta property="og:locale" content="tr_TR">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0b0d12">
<link rel="canonical" href="${url}">
<link rel="icon" href="/og.jpg">
<link rel="stylesheet" href="/rehber/rehber.css">
<script type="application/ld+json">${jsonld}</script>
</head>
<body>
<header class="bar"><div class="in">
  <img src="/og.jpg" alt="Gizli Madde logosu">
  <b>Gizli Madde</b>
  <a href="/">← Ana sayfa</a>
</div></header>

<main class="wrap">
  <p class="oz">Rehber · ${TAR} · 4 dk okuma</p>
  <h1>${m.baslik}</h1>
  <p class="lead">${m.lead}</p>

  <div class="card ozet">
    <span class="t">⚡ Bu yazıda</span>
    <ul style="margin-bottom:0">${ozetLi}</ul>
  </div>

  ${bolumler}

  <h2>Sıkça Sorulan Sorular</h2>
  ${sss}

  <div class="cta">
    <p class="t">Sözleşmeni 30 saniyede tara</p>
    <p>Kira, taksitli alışveriş ya da iş sözleşmeni yükle; tehlikeli maddeler orijinal metninde kırmızıyla işaretlensin. Ücretsiz, kayıt yok.</p>
    <a class="btn" href="/">🔍 Sözleşmeyi Tara</a>
  </div>

  <p class="uyari"><strong>⚠️ Bu yazı bilgilendirme amaçlıdır ve hukuki tavsiye değildir.</strong> Mevzuat ve uygulama zamanla değişebilir; güncel oran ve hükümler için TÜİK verilerine ve bir hukuk uzmanına danışmanızı öneririz. Gizli Madde, bir risk tespit aracıdır.</p>
</main>
</body>
</html>`;
}

fs.mkdirSync(DIR, { recursive: true });
makaleler.forEach(m => fs.writeFileSync(path.join(DIR, m.slug + '.html'), sayfa(m), 'utf8'));
console.log('Yazildi:', makaleler.length, 'makale ->', DIR);
makaleler.forEach(m => console.log('  /rehber/' + m.slug));
