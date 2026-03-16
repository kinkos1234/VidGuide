# Part 0. 시작하기 전에

## 생성형 AI 준비물

<div class="info-grid">
  <div class="info-card">
    <div class="info-icon">🎨</div>
    <div class="info-label">이미지 생성</div>
    <div class="info-title">Nanobanana Pro / 2</div>
    <div class="info-desc">캐릭터, 배경, 스토리보드 이미지 (Freepik/Higgsfield API 경유)</div>
  </div>
  <div class="info-card">
    <div class="info-icon">🎬</div>
    <div class="info-label">비디오 생성</div>
    <div class="info-title">Kling 3.0</div>
    <div class="info-desc">Image-to-Video, 립싱크, 캐릭터 바인딩</div>
  </div>
  <div class="info-card">
    <div class="info-icon">🎙️</div>
    <div class="info-label">음성 생성</div>
    <div class="info-title">ElevenLabs</div>
    <div class="info-desc">내레이션, 보이스오버</div>
  </div>
  <div class="info-card">
    <div class="info-icon">🎵</div>
    <div class="info-label">배경음악</div>
    <div class="info-title">Suno</div>
    <div class="info-desc">인스트루멘탈 BGM</div>
  </div>
  <div class="info-card">
    <div class="info-icon">💥</div>
    <div class="info-label">효과음</div>
    <div class="info-title">SORA 2 / Kling 3.0</div>
    <div class="info-desc">환경음, SFX</div>
  </div>
  <div class="info-card">
    <div class="info-icon">✍️</div>
    <div class="info-label">시나리오 보조</div>
    <div class="info-title">Claude / Gemini</div>
    <div class="info-desc">시나리오 작성, 검토, 번역</div>
  </div>
</div>

## 핵심 원칙: Image-to-Video 방식

<div class="formula-box">
  <span class="dim">❌ Text → Video</span><br>
  <span class="accent">✅ Image → Video</span><br>
  <span class="dim">이미지 생성 단계에서 거의 모든 것을 결정</span>
</div>

- **Text-to-Video가 아닌 Image-to-Video**가 현 시점 최선의 방법
- 이미지 생성 단계에서 배우, 배경, 조명, 미술, 촬영에 해당하는 거의 모든 것을 결정
- 이미지 생성 모델은 현재 Google Nanobanana 계열이 가장 뛰어남

```mermaid
flowchart LR
    A["🎨 이미지 생성<br>(Nanobanana)"] --> B["🎬 비디오 변환<br>(Kling 3.0)"]
    B --> C["🎙️ 음성/립싱크<br>(ElevenLabs + Kling)"]
    C --> D["🎵 사운드<br>(Suno + SORA)"]
    D --> E["✂️ 편집<br>(Premiere/CapCut)"]

    style A fill:#1a1926,stroke:#8b5cf6,color:#ededef
    style B fill:#1a1926,stroke:#8b5cf6,color:#ededef
    style C fill:#1a1926,stroke:#8b5cf6,color:#ededef
    style D fill:#1a1926,stroke:#8b5cf6,color:#ededef
    style E fill:#1a1926,stroke:#8b5cf6,color:#ededef
```

## API 서비스 활용

- **Freepik, Higgsfield** 같은 API 서비스로 여러 AI를 하나의 구독으로 이용
- 장점: 비용 효율적, 다양한 모델 접근
- 단점: 본 서비스의 100% 기능 미제공, 트래픽 우선순위 낮음
- **Kling 본 서비스 별도 구독 필요**: 립싱크, 캐릭터 바인딩 기능은 API에서 미지원

<div class="compare-grid">
  <div class="compare-col">
    <div class="compare-label good">API 서비스 (Freepik/Higgsfield)</div>
    <p>✓ 비용 효율적 (하나의 구독)</p>
    <p>✓ 다양한 모델 접근</p>
    <p>✗ 100% 기능 미제공</p>
    <p>✗ 트래픽 우선순위 낮음</p>
  </div>
  <div class="compare-col">
    <div class="compare-label good">본 서비스 직접 구독</div>
    <p>✓ 전체 기능 사용 가능</p>
    <p>✓ 립싱크, 캐릭터 바인딩</p>
    <p>✗ 개별 구독 비용</p>
    <p>✗ 서비스별 별도 관리</p>
  </div>
</div>

## 기타 준비물

- **편집 프로그램**: Premiere Pro / CapCut(초보 추천) / Final Cut Pro
- **업스케일러**: Topaz (720p~1080p → 4K)
- **스토리보드 도구**: Figma (무료, 넓은 캔버스에 이미지 자유 배치)
