# Geçerken Uğradım: Akıllı Turizm ve Kültür Keşif Asistanı

**"Geçerken Uğradım", seyahatlerinizi basit bir destinasyona ulaşımdan öteye taşıyarak, rotanız üzerindeki gözden kaçan kültürel, tarihi ve doğal zenginlikleri keşfetmenizi sağlayan, yapay zeka destekli, kişiselleştirilmiş bir turizm ve kültür merkezleri navigasyon sistemi projesidir.**

Bu proje, modern gezginlerin seyahat deneyimlerini kökten değiştirmeyi, yolculuklarını daha anlamlı, keşif dolu ve kişisel bir maceraya dönüştürmeyi amaçlamaktadır. Popüler turistik hedeflerin yanı sıra, özellikle keşfedilmeyi bekleyen, otantik ve çoğu zaman göz ardı edilen yerleri akıllıca önererek, her anınızı bir keşif fırsatına çevirmenize olanak tanır.

## 🎯 Projenin Temel Hedefleri

- **Keşif Odaklı Seyahat Deneyimi Sunmak:** Geleneksel navigasyonun "en kısa/hızlı yol" mantığının ötesine geçerek, yolculuğun kendisini bir keşif macerasına dönüştürmek.
- **Kişiselleştirilmiş Rota Önerileri:** Kullanıcıların bireysel ilgi alanlarına, bütçelerine ve zaman kısıtlarına uygun, özel olarak optimize edilmiş rotalar sunmak.
- **Gizli Kalmış Hazineleri Ortaya Çıkarmak:** Az bilinen ancak değerli noktaları (POI) kullanıcılara sunmak.
- **Anlamsal Zeka ile Derinlemesine Analiz:** Büyük Dil Modelleri (LLM) ile kullanıcı niyetlerini ve POI'lerin niteliksel özelliklerini anlamak.
- **Dinamik ve Güncel Bilgi Sağlamak:** Anlık analizler ve güncellenen veri kaynaklarıyla doğru bilgi sunmak.
- **Yerel Ekonomilere ve Kültürel Mirasa Katkı:** Yerel işletmeleri destekleyerek kültürel farkındalığı artırmak.

## 🛠️ Çözülen Temel Problemler

1. **Popülerlik Tuzağı:** Sıklıkla önerilen mekanların dışına çıkılmasını sağlar.
2. **Rota Körlüğü:** Rotaları sadece varış odaklı görmek yerine, keşif koridoruna dönüştürür.
3. **Yüzeysel Kişiselleştirme:** Amaç, zaman ve bağlam gibi boyutlarla derin kişiselleştirme sağlar.
4. **Statik Veri Sorunu:** Dinamik veri ile güncellik problemini çözer.
5. **Yerel Ekonomik Dengesizlik:** Yerel ve küçük işletmeleri dijital ortama taşıyarak görünürlük kazandırır.

## ✨ Anahtar Özellikler

- Çok kriterli rota puanlama
- Dinamik POI filtreleme
- LLM destekli içerik üretimi (LLaMA-4)
- Openverse API ile görsel eşleştirme
- React Native tabanlı harita arayüzü
- Canlı navigasyon ve rota takibi
- Kullanıcı profili ve favori yönetimi

## 🏗️ Teknoloji Mimarisi

- **Frontend:** React Native, Zustand, TanStack Query
- **Backend:** Spring Boot, REST API, MongoDB
- **Veri Katmanı:** OpenStreetMap, TomTom, Groq API (LLM), Openverse API

## 🚀 Kurulum (Kısa)

1. `git clone ...`
2. `npm install` ve `expo start`
3. `mvn spring-boot:run`

(Detaylı adımlar ileriki sürümlerde güncellenecektir.)

## 📄 Kullanım Akışları

1. Rota planlama: POI'ler, Openverse ve LLM ile zenginleştirilir.
2. LLM destekli sohbet: Doğal dilde rota planı.
3. Canlı navigasyon: Gerçek zamanlı konum takibi.

## 🤝 Katkı

Forklayın, geliştirin, PR açın.

## 📝 Akademik Kaynak

Demir, Y., Asav, H., & Çakır, E. *Geçerken Uğradım: Turizm ve Kültür Merkezleri Navigasyon Sistemi*, KOÜ, 2025.

