# AI 영화 제작 완전 가이드

> 율파파(darkcommis)의 AI 영화제 수상 워크플로우 정리
> 원본 출처: [Notion 가이드](https://oasis-dentist-28a.notion.site/31f7425e612280ef8a88e5af317588ac)

---

## 이 가이드는?

여러 국제 AI 영화제에서 수상한 **율파파(darkcommis)**의 AI 영화 제작 워크플로우를 체계적으로 정리한 교육 자료입니다. 아이디어 구상부터 영화제 출품까지의 전 과정을 다룹니다.

---

## 전체 워크플로우 요약

```
아이디어 → 시놉시스 → 시나리오 (7단계)
  → 캐릭터 레퍼런스 (5단계) + 배경 레퍼런스
    → 디렉터 노트 → 샷 리스트 → 스토리보드 (Figma)
      → 이미지 생성 (3x3 그리드 / 4단 스택 + 무드 레퍼런스)
        → 비디오 생성 (인물 움직임 + 카메라 움직임)
          → 대사/립싱크 (Kling 3.0)
            → 편집 (스트레이트 컷 기본 + 13가지 원리)
              → 사운드 (SFX: Kling/SORA2 + BGM: Suno)
                → 자막 → 업스케일링 (Topaz)
                  → FilmFreeway 출품 → 영화제 도전!
```

---

## 가이드 구성

| 파트 | 내용 | 핵심 |
|------|------|------|
| [Part 0. 준비](part0-preparation.md) | 도구 준비, 핵심 원칙 | Image-to-Video 방식 |
| [Part 1. 시작](part1-start.md) | 이야기 출발점, LLM 활용 | 검증된 이야기 + 내 분야 |
| [Part 2. 시나리오](part2-scenario.md) | 7단계 워크플로우, 캐릭터 레퍼런스, 프로덕션 문서 | 프롬프트 예시 포함 |
| [Part 3. 시각화](part3-visualization.md) | 이미지/비디오 생성, 대사/립싱크 | 3x3 그리드, 비디오 프롬프트 공식 |
| [Part 4. 편집](part4-editing.md) | 편집 원리, 사운드, 자막 | 13가지 편집 원리 |
| [Part 5. 개봉](part5-release.md) | FilmFreeway, 영화제 전략 | 출품 가이드 |

---

## 핵심 도구 정리

| 단계 | 도구 | 역할 |
|------|------|------|
| 시나리오 | Claude / Gemini | 시나리오 작성, 검토, 프롬프트 생성 |
| 이미지 생성 | Google Nanobanana Pro/2 | 캐릭터, 배경, 스토리보드 |
| 무드 참조 | Midjourney | 키 비주얼, 색감/톤 레퍼런스 |
| 비디오 생성 | Kling 3.0 | I2V, 립싱크, 캐릭터 바인딩, 환경음 |
| 효과음 | SORA 2 / Kling 3.0 | SFX, 환경음 |
| 음성 | ElevenLabs | 내레이션, 보이스오버 |
| 배경음악 | Suno (Custom, Instrumental) | BGM |
| 편집 | Premiere Pro / CapCut / Final Cut | 영상 편집 |
| 스토리보드 | Figma | 샷 조직화, 레퍼런스 관리 |
| 업스케일링 | Topaz | 720p/1080p → 4K |
| API 서비스 | Freepik / Higgsfield | 다중 AI 모델 접근 |
| 출품 | FilmFreeway | 국제 영화제 출품 |
