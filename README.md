# LANDING FACTORY V0

한 줄 정의: 상품/서비스 정보를 한 번 입력하면, 서로 다른 설득 전략을 가진 랜딩페이지 여러 개를 자동 생성하고 각각 독립적으로 미리볼 수 있는 AI 랜딩 실험기.

이 폴더는 **인쇄소형 공장 콘솔**로 다시 조판한 프로토타입니다. SaaS가 아닙니다. 가설은 하나입니다.

> 하나의 상품을 가지고 서로 다른 랜딩페이지를 매우 빠르게 여러 개 만들어 시장에 던질 수 있는가?

## 바로 실험

- 앱: https://raw.githack.com/nijohiohc2-arch/landing-factory-v0/main/index.html
- GitHub Pages: https://nijohiohc2-arch.github.io/landing-factory-v0/
- 저장소: https://github.com/nijohiohc2-arch/landing-factory-v0

## 실행

```bash
cd landing-factory
python3 -m http.server 8765
# http://localhost:8765
```

데이터는 브라우저 `localStorage`에만 저장됩니다. `index.html`은 로컬 `css/`, `js/`를 직접 로드합니다.

## V0 범위

포함: 입력, 원클릭 샘플, 10개 전략, 보드, 미리보기, 라이브 수정, 복제, 링크 복사, 2장 비교, 고유 slug, 반응형, 독립 화면.

제외: 가입, 결제, CRM, 문자, 광고, 방문자 분석, A/B 자동화, 실 AI API.
