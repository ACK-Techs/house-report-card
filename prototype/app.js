/**
 * Ev Karnesi — Mobil İnteraktif Prototip Router & State Yönetimi
 */

// Ekranlar ve Navigasyon Haritası
const screensWithNav = ['home', 'property-search', 'area-search', 'property-report', 'area-report', 'compare', 'saved', 'history', 'profile', 'settings', 'help'];

// Router Fonksiyonu
function navigateTo(screenId) {
  // Tüm ekranları gizle
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Hedef ekranı göster
  const targetScreen = document.getElementById(`screen-${screenId}`);
  if (targetScreen) {
    targetScreen.classList.add('active');
    targetScreen.scrollTop = 0;
  }

  if (screenId === 'survey') {
    currentSurveyStep = 1;
    renderSurveyStep();
  }

  // Üstteki kontrol select'ini senkronize et
  const selectEl = document.getElementById('screenSelect');
  if (selectEl && selectEl.value !== screenId) {
    selectEl.value = screenId;
  }

  // Alt yüzer navigasyon görünürlük kontrolü
  const bottomNav = document.getElementById('bottomNav');
  if (bottomNav) {
    if (screensWithNav.includes(screenId)) {
      bottomNav.classList.remove('hidden');
    } else {
      bottomNav.classList.add('hidden');
    }
  }

  // Alt navigasyon aktif sekme vurgusu
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  if (screenId === 'home') {
    document.getElementById('nav-home')?.classList.add('active');
  } else if (screenId === 'property-search' || screenId === 'area-search') {
    document.getElementById('nav-search')?.classList.add('active');
  } else if (screenId === 'profile' || screenId === 'settings') {
    document.getElementById('nav-profile')?.classList.add('active');
  }
}

// Akordeon Açma/Kapama
function toggleAccordion(header) {
  const item = header.parentElement;
  if (item) {
    item.classList.toggle('open');
  }
}

// Seçim Chip'leri Aç/Kapa
function toggleChip(chip) {
  chip.classList.toggle('selected');
}

// Radyo tipi tekli seçim chip'i
function toggleRadioChip(chip, parentSelector) {
  const container = document.querySelector(parentSelector);
  if (container) {
    container.querySelectorAll('.choice-chip').forEach(c => c.classList.remove('selected'));
    chip.classList.add('selected');
  }
}

// Kişiselleştirme Anketi (5 Adımlı Wizard) Yönetimi
let currentSurveyStep = 1;
const surveyStepCategories = {
  1: "Hane ve Kullanım Amacı",
  2: "Afet ve Zemin Duyarlılığı",
  3: "Ulaşım ve Hareketlilik",
  4: "Mahalle ve Yaşam Tarzı",
  5: "İklim, Cephe & Bölge"
};

function renderSurveyStep() {
  // Tüm adımları gizle, aktifi göster
  for (let i = 1; i <= 5; i++) {
    const stepEl = document.getElementById(`survey-step-${i}`);
    if (stepEl) {
      if (i === currentSurveyStep) {
        stepEl.classList.add('active');
      } else {
        stepEl.classList.remove('active');
      }
    }
  }

  // Göstergeleri güncelle
  const stepNumEl = document.getElementById('surveyStepNum');
  const catEl = document.getElementById('surveyStepCategory');
  const progressEl = document.getElementById('surveyProgressBar');
  const prevBtn = document.getElementById('surveyPrevBtn');
  const nextBtn = document.getElementById('surveyNextBtn');

  if (stepNumEl) stepNumEl.innerText = `Adım ${currentSurveyStep} / 5`;
  if (catEl) catEl.innerText = surveyStepCategories[currentSurveyStep] || '';
  if (progressEl) progressEl.style.width = `${(currentSurveyStep / 5) * 100}%`;

  // Buton durumları
  if (prevBtn) {
    prevBtn.style.display = currentSurveyStep > 1 ? 'block' : 'none';
  }

  if (nextBtn) {
    if (currentSurveyStep === 5) {
      nextBtn.innerText = 'Tercihleri Kaydet ve Başla ⚡';
    } else {
      nextBtn.innerText = 'İleri →';
    }
  }

  // Sayfanın en üstüne kaydır
  const surveyScreen = document.getElementById('screen-survey');
  if (surveyScreen) surveyScreen.scrollTop = 0;
}

function nextSurveyStep() {
  if (currentSurveyStep < 5) {
    currentSurveyStep++;
    renderSurveyStep();
  } else {
    // 5. Adım tamamlandı -> Şık Başarı Modalını Aç
    const modal = document.getElementById('surveySuccessModal');
    if (modal) {
      modal.classList.add('show');
    } else {
      navigateTo('home');
    }
  }
}

function closeSurveyModalAndGoHome() {
  const modal = document.getElementById('surveySuccessModal');
  if (modal) {
    modal.classList.remove('show');
  }
  currentSurveyStep = 1;
  renderSurveyStep();
  navigateTo('home');
}

function prevSurveyStep() {
  if (currentSurveyStep > 1) {
    currentSurveyStep--;
    renderSurveyStep();
  } else {
    navigateTo('welcome');
  }
}

// Giriş / Kayıt Sekmesi
function setAuthTab(mode) {
  const chips = document.querySelectorAll('#screen-welcome .choice-chip');
  chips.forEach(c => c.classList.remove('selected'));
  if (mode === 'login') {
    chips[0]?.classList.add('selected');
  } else {
    chips[1]?.classList.add('selected');
  }
}

// Simüle Edilmiş Haritada Bina Seçimi
function selectBuilding(buildingEl, title, meta) {
  document.querySelectorAll('.map-building').forEach(b => b.classList.remove('selected'));
  buildingEl.classList.add('selected');

  // Pulse işaretçisini binanın üstüne taşı
  const pulsePin = document.querySelector('.map-pin-pulse');
  if (pulsePin) {
    pulsePin.style.top = (buildingEl.offsetTop + buildingEl.offsetHeight / 2) + 'px';
    pulsePin.style.left = (buildingEl.offsetLeft + buildingEl.offsetWidth / 2) + 'px';
  }

  // Seçilen özet kartını güncelle
  const titleEl = document.getElementById('selectedBuildingTitle');
  const metaEl = document.getElementById('selectedBuildingMeta');
  if (titleEl) titleEl.innerText = title;
  if (metaEl) metaEl.innerText = meta + ' • Parsel Eşleşme Güveni: Yüksek';
}

// İlçe değiştiğinde harita simülasyonu
function updateMapFocus(district) {
  const titleEl = document.getElementById('selectedBuildingTitle');
  const badgeEl = document.getElementById('selectedBuildingBadge');
  if (badgeEl) badgeEl.innerText = `${district} / Merkez`;
  if (titleEl) titleEl.innerText = `${district} Örnek Bina No: 12`;
}

// Konumu Doğrula Bottom Sheet'ini Aç
function openConfirmSheet() {
  navigateTo('confirm-location');
}

// Rapor Oluştur ve Yüklenme Simülasyonu
function generateReportAndNavigate() {
  const btn = event?.target;
  if (btn) {
    btn.innerHTML = '⏳ Veriler Taranıyor (AFAD & İBB)...';
    btn.disabled = true;
  }

  setTimeout(() => {
    if (btn) {
      btn.innerHTML = 'Karnesini Hazırla ve Gör ⚡';
      btn.disabled = false;
    }
    navigateTo('property-report');
  }, 700);
}

// Cihaz Çerçevesi Aç/Kapa
let isFrameActive = true;
function toggleDeviceFrame() {
  const frame = document.getElementById('deviceFrame');
  const container = document.getElementById('deviceContainer');
  
  isFrameActive = !isFrameActive;
  if (!isFrameActive) {
    frame.style.width = '100%';
    frame.style.maxWidth = '480px';
    frame.style.borderRadius = '24px';
    frame.style.boxShadow = 'var(--shadow-lg)';
  } else {
    frame.style.width = '390px';
    frame.style.maxWidth = '390px';
    frame.style.borderRadius = '48px';
    frame.style.boxShadow = '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 12px #1E293B, 0 0 0 14px #334155';
  }
}

// Başa Dön / Reset
function resetPrototype() {
  navigateTo('welcome');
}

// Canlı Saat Güncelleyici
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const timeEl = document.getElementById('currentTime');
  if (timeEl) timeEl.innerText = `${hours}:${minutes}`;
}

// Başlangıç
document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 30000);
  navigateTo('home');
});
