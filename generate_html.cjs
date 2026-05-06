const fs = require('fs');

const rawData = fs.readFileSync('data/jobs.json', 'utf-8');
const jobs = JSON.parse(rawData);

function analyzeJob(job) {
    let score = 5;
    let tags = [];
    let recommendation = "추천";
    let reason = "";
    let risk = "";
    let projectToHighlight = "소상상점 / 쌍청문 공간대여 시스템";
    let learningPoint = "";
    let motivation = "";

    const title = (job.title || "").toLowerCase();
    const stack = (job.stack || "").toLowerCase();
    const experience = (job.experience || "").toLowerCase();

    // Check for Next.js / React / TypeScript
    if (stack.includes('react') || title.includes('react')) {
        score += 2;
        tags.push('React');
    }
    if (stack.includes('typescript') || title.includes('typescript') || stack.includes('ts')) {
        score += 1;
        tags.push('TypeScript');
    }
    if (stack.includes('next.js') || stack.includes('nextjs')) {
        score += 2;
        tags.push('Next.js');
    }
    if (title.includes('프론트') || stack.includes('프론트') || stack.includes('frontend')) {
        score += 1;
        tags.push('Frontend');
    }

    // Check for junior / new grad
    if (experience.includes('신입') || title.includes('인턴') || title.includes('주니어') || experience.includes('경력 1-3년') || experience.includes('경력 1-4년')) {
        score += 2;
        tags.push('Junior-Friendly');
    } else if (experience.includes('경력 3년 이상') || experience.includes('시니어') || experience.includes('리드') || experience.includes('경력 1-10년') || experience.includes('경력 1-5년')) {
        score -= 3;
        risk += "경력 요구 가능성; ";
    }

    // Check for relevant domains
    if (title.includes('웹') || title.includes('서비스') || title.includes('스타트업') || title.includes('mvp') || title.includes('예약') || title.includes('상점') || title.includes('관리자')) {
        score += 1;
        tags.push('Domain-Match');
    }

    // Check for backend-heavy or other non-matching things
    if (title.includes('백엔드') && !title.includes('프론트')) {
        score -= 4;
        risk += "백엔드 위주 포지션; ";
    }
    if (title.includes('퍼블리셔') || stack.includes('퍼블리셔')) {
        score -= 2;
        risk += "단순 퍼블리싱 업무 가능성; ";
    }

    // Cap score at 10, floor at 1
    score = Math.max(1, Math.min(10, score));

    // Determine recommendation level
    if (score >= 8) {
        recommendation = "강력 추천";
        reason = "주력 스택(Next.js/React/TypeScript)과 잘 맞으며, 주니어 지원이 적합해 보입니다.";
        learningPoint = "채용 공고의 세부 도메인 지식 파악";
        motivation = "React 기반의 서비스 개발 경험을 바탕으로 기여하고 싶습니다.";
    } else if (score >= 6) {
        recommendation = "추천";
        reason = "프론트엔드 역량을 발휘할 수 있는 포지션입니다.";
        learningPoint = "회사에서 요구하는 추가 기술 스택(상세 내용 확인 필요)";
        motivation = "사용자 중심의 웹 서비스 개발 경험을 적용하고 싶습니다.";
    } else if (score >= 4) {
        recommendation = "보류";
        reason = "일부 조건이 맞지 않거나 확인이 필요합니다.";
        learningPoint = "부족한 스택에 대한 기초 학습";
        motivation = "새로운 도메인에서 프론트엔드 기술을 확장하고 싶습니다.";
    } else {
        recommendation = "비추천";
        reason = "지원자의 주요 역량과 방향성이 맞지 않을 가능성이 큽니다.";
        learningPoint = "해당 공고의 핵심 스택 파악 (지원 시)";
        motivation = "기존 경험을 살려 빠르게 적응하겠습니다.";
        projectToHighlight = "-";
    }

    if (risk === "") risk = "없음";

    return {
        ...job,
        analysis: {
            score,
            tags,
            recommendation,
            reason,
            risk,
            projectToHighlight,
            learningPoint,
            motivation,
            summary: `${job.company} - ${job.title}`
        }
    };
}

const analyzedJobs = jobs.map(analyzeJob).sort((a, b) => b.analysis.score - a.analysis.score);

const getStatusColor = (recommendation) => {
    switch(recommendation) {
        case '강력 추천': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
        case '추천': return 'bg-blue-100 text-blue-800 border-blue-200';
        case '보류': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case '비추천': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

let htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>채용 공고 분석 결과</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #f7f8fb; color: #1f2937; }
        .card { background-color: #ffffff; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .point-color { color: #6366f1; }
        .bg-point { background-color: #6366f1; }
        .bg-point:hover { background-color: #4f46e5; }
    </style>
</head>
<body class="p-6">
    <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold mb-6 point-color">맞춤형 채용 공고 분석 리포트</h1>

        <div class="mb-8 flex flex-wrap gap-2">
            <button onclick="filterJobs('all')" class="px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500">전체</button>
            <button onclick="filterJobs('source', 'saramin')" class="px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500">사람인</button>
            <button onclick="filterJobs('source', 'wanted')" class="px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500">원티드</button>
            <button onclick="filterJobs('source', 'jobkorea')" class="px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500">잡코리아</button>
            <button onclick="filterJobs('recommendation', '강력 추천')" class="px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500">강력 추천</button>
            <button onclick="filterJobs('recommendation', '보류')" class="px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500">보류</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="jobs-container">
`;

analyzedJobs.forEach(job => {
    htmlContent += `
            <div class="card rounded-lg p-5 flex flex-col h-full job-card" data-source="${job.source}" data-recommendation="${job.analysis.recommendation}">
                <div class="flex justify-between items-start mb-3">
                    <span class="px-2.5 py-0.5 rounded text-xs font-medium border ${getStatusColor(job.analysis.recommendation)}">
                        ${job.analysis.recommendation} (점수: ${job.analysis.score}/10)
                    </span>
                    <span class="text-xs text-gray-500">${new Date(job.scraped_at).toLocaleString()}</span>
                </div>

                <h2 class="text-lg font-bold mb-1 truncate" title="${job.title}">${job.title}</h2>
                <div class="text-sm text-gray-600 mb-3 font-medium">${job.company} <span class="text-gray-400">|</span> ${job.location}</div>

                <div class="mb-3">
                    <p class="text-sm font-semibold mb-1">한줄 요약:</p>
                    <p class="text-sm text-gray-700 bg-gray-50 p-2 rounded">${job.analysis.summary}</p>
                </div>

                <div class="mb-3 flex-grow">
                    <p class="text-sm font-semibold mb-1">분석 내역:</p>
                    <ul class="text-sm space-y-1 text-gray-700">
                        <li><span class="font-medium">이유:</span> ${job.analysis.reason}</li>
                        <li><span class="font-medium text-red-600">위험:</span> ${job.analysis.risk}</li>
                        <li><span class="font-medium text-blue-600">앞세울 플젝:</span> ${job.analysis.projectToHighlight}</li>
                        <li><span class="font-medium text-green-600">학습포인트:</span> ${job.analysis.learningPoint}</li>
                        <li><span class="font-medium text-purple-600">지원동기:</span> ${job.analysis.motivation}</li>
                    </ul>
                </div>

                <div class="mb-4">
                    <div class="flex flex-wrap gap-1">
                        ${job.analysis.tags.map(tag => `<span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">${tag}</span>`).join('')}
                    </div>
                </div>

                <a href="${job.url}" target="_blank" class="mt-auto block text-center w-full bg-point text-white font-medium py-2 px-4 rounded transition duration-150 ease-in-out">
                    원본 공고 보기
                </a>
            </div>
    `;
});

htmlContent += `
        </div>
    </div>

    <script>
        function filterJobs(type, value) {
            const cards = document.querySelectorAll('.job-card');
            cards.forEach(card => {
                if (type === 'all') {
                    card.style.display = 'flex';
                } else if (type === 'source') {
                    card.style.display = card.dataset.source === value ? 'flex' : 'none';
                } else if (type === 'recommendation') {
                    card.style.display = card.dataset.recommendation === value ? 'flex' : 'none';
                }
            });
        }
    </script>
</body>
</html>
`;

fs.writeFileSync('docs/index.html', htmlContent);
console.log('Successfully generated docs/index.html');
