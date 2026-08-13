"use client";
import ProjectDeepCard from "./projectDeepCard";
import EldTripPlanner from "../../assets/mainProjects/eld-trip-planner.png";
import EldTripPlannerVideo from "../../assets/mainProjects/eld-trip-planner-video.mp4"


// Lead section: backend services, integrations, and AI systems.
// Order here is the order they render — strongest engineering work first.
const PROJECTS = [

  {
    title: "B2 MCP Server — Cloud Storage an AI Can Be Trusted With",
    oneLiner:
      "Nine MCP tools that let an AI client manage Backblaze B2 by conversation — list, upload, download, delete, report usage against a budget — built around the question the API calls don't ask: what happens when a language model is the one calling them.",
    overview:
      "An MCP (Model Context Protocol) server over stdio that exposes Backblaze B2 Cloud Storage as tools any MCP-compatible AI client can call, so B2 is managed by talking to an assistant instead of writing SDK code or clicking through the web console. The interesting engineering is not the API calls, it is the guardrails around them: filesystem access denies by default and is fenced to separate read and write roots resolved through realpath; the one tool that destroys data takes an exact fileId and refuses to resolve one from a file name, so \"delete hello.txt\" cannot be satisfied in a single step; deletion is refused outright unless an append-only audit log is configured, and writes an INTENT record before acting and an OUTCOME record after, on failure too. B2 exposes no usage endpoint at all, so bucket usage is summed from file versions — including old ones, because B2 bills for those — and reported as an honest floor with the parts it cannot sum called out separately. Built in TypeScript on Node 22.",
    tech: [
      "TypeScript",
      "Node.js 22",
      "Model Context Protocol (MCP)",
      "@modelcontextprotocol/sdk",
      "Backblaze B2",
      "@backblaze-labs/b2-sdk",
      "Zod",
      "Vitest",
      "stdio transport",
    ],
    features: [
      "Nine tools over stdio: list buckets, list files, upload, download, hide, unhide, delete a version, bucket usage against a budget, and list application keys",
      "Local filesystem access denies by default — upload reads only from B2_UPLOAD_ROOT, download writes only to B2_DOWNLOAD_ROOT, and both refuse outright when the root is unset; separate roots so read and write can be granted independently",
      "Containment resolved with realpath before comparison, so a symlink inside the root cannot point outside it, and checked as target === root || startsWith(root + sep) — a bare startsWith would admit the sibling directory /data/uploads-evil for the root /data/uploads",
      "The one destructive tool cannot be aimed loosely: b2_delete_file_version takes an exact fileId and refuses to look one up from a name, so the id has to come out of a listing a human can see — a confirm flag would not help, since the same model that calls the tool would set it",
      "Deletion refused unless an append-only audit log is configured, with an INTENT record written before the call and an OUTCOME record after, success or failure — a log that can miss events is not a log",
      "The credentials boundary enumerates all nine fields it emits rather than spreading the SDK's key object, so a future SDK version that adds a secret-bearing field cannot leak it by accident; key creation is deliberately not implemented, because B2 returns the live secret only from createKey and that value would land in a model's context window",
      "Partial results announce themselves — truncated/nextFileName on listings, anyTruncated and unfinishedLargeFiles on usage, and scopedToBucketId when the key's own restriction narrowed a whole-account listing to one bucket; a partial answer presented as a complete one is worse than a refusal, because the caller cannot tell",
      "Least-privilege keys are the tested path: B2 rejects an unfiltered listBuckets from a bucket-restricted key with a 401 and the listAllBucketNames capability does not exempt it — caught by rotating the credential, not by any test, because a fake listBuckets agrees with whatever the caller does",
      "Downloads written atomically to <target>.<pid>.partial, length-checked, and renamed onto the target only on a match — the SDK errors a checksum failure after bytes have flowed, so writing straight to the final path would strand a truncated file",
    ],
    video: "/aiApplications/b2McpServer/b2-mcp-server-video.mp4",
    architecture: "/aiApplications/b2McpServer/architecture.png",
    architectureCaption:
      "AI client (Claude Desktop, MCP Inspector) → stdio → MCP server → nine tool handlers, each chaining loadConfig → B2 client → a core module. Two guards sit between the model and anything irreversible: the path fence (separate read and write roots, realpath-resolved, denied by default) on every tool that touches the local disk, and the audit log gate on b2_delete_file_version, which refuses to call B2 at all unless an append-only record can be written — INTENT before, OUTCOME after. Every whole-account call passes through one scope module that narrows the request to what the application key is actually allowed to see.",
    gallery: [
      {
        src: "/aiApplications/b2McpServer/bucket-usage.png",
        label: "Bucket usage against a budget B2 itself cannot report",
      },
      {
        src: "/aiApplications/b2McpServer/path-fence-refusal.png",
        label: "Upload refused — the path escapes the configured root",
      },
      {
        src: "/aiApplications/b2McpServer/missing-capability.png",
        label: "Key lacks listKeys — a plain refusal, not a raw 401",
      },
    ],
    githubUrl: "https://github.com/ffumero2003/b2-mcp-server",
  }, 

  {
    title: "Pre-Signed URL Upload Service",
    oneLiner:
      "A backend that issues time-limited signed URLs so clients upload files directly into a private cloud bucket, then notify the service — the exact connector pattern of client → storage → backend, with the bucket never going public and the file bytes never passing through the API.",
    overview:
      "A Flask service that brokers secure uploads without ever exposing the storage bucket or routing file bytes through the API. A client asks for permission to upload; the service signs a short-lived, single-object, single-verb (PUT) URL using a service-account key and returns it. The client uploads the file straight to a private Google Cloud Storage bucket with that URL — offloading the heavy transfer off the API entirely. The client then notifies the backend, which verifies the object actually exists in the bucket (rather than trusting the client's claim) before recording its metadata. Built from scratch to learn object storage and signed URLs hands-on, mapping directly to the AWS S3 pre-signed URL equivalent.",
    tech: [
      "Python",
      "Flask",
      "Google Cloud Storage",
      "Signed URLs",
      "REST APIs",
      "Service Accounts / IAM",
    ],
    features: [
      "Issues v4 signed PUT URLs scoped to one object and one operation, signed locally with a service-account private key — no credentials exposed and the bucket never made public",
      "Direct-to-bucket uploads: the file travels client → storage on its own lane, so the API only handles permission and metadata and stays light regardless of file size",
      "Short TTL on every URL (least-privilege + time-boxed): a leaked URL is rejected by storage within minutes — demonstrated with an ExpiredToken rejection on an expired URL",
      "Verify-don't-trust on completion: the backend confirms the object exists in the bucket (blob.exists) before recording, returning 404 when a claimed upload isn't there",
      "Three REST endpoints with proper status codes: POST /upload-url (issue), POST /complete (verify + record), GET /files (list)",
      "Documented S3 equivalence (boto3 generate_presigned_url) and honest limitations (in-memory metadata, no auth, dev server) for production-readiness framing",
    ],
    video: "/backendAndIntegration/presigned-upload-service/presigned-demo.mp4",
    poster:
      "/backendAndIntegration/presigned-upload-service/signed-url-issued.png",
    architecture:
      "/backendAndIntegration/presigned-upload-service/presigned-url-service-architecture.png",
    architectureCaption:
      "Client → POST /upload-url → service signs a short-lived PUT URL → client uploads the file DIRECTLY to the private GCS bucket (bytes never touch the API) → client calls POST /complete → backend verifies the object exists and records its metadata. The bucket stays private throughout; each URL is single-object, single-verb, and time-boxed.",
    gallery: [
      {
        src: "/backendAndIntegration/presigned-upload-service/signed-url-issued.png",
        label: "Signed URL issued — time-limited PUT permission",
      },
      {
        src: "/backendAndIntegration/presigned-upload-service/recorded-metadata.png",
        label: "Backend verifies the object, then records its metadata",
      },
      {
        src: "/backendAndIntegration/presigned-upload-service/expiry-rejection.png",
        label: "Expired URL rejected by storage — TTL enforced",
      },
    ],
    githubUrl: "https://github.com/ffumero2003/presigned-upload-service",
    lookerUrl: "", // no dashboard for this one
    linkedinUrl: "", // paste your LinkedIn post link to show the button
  },

  {
    title: "Connector Service — Caching API Gateway",
    oneLiner:
      "A backend service that sits in front of an upstream public API, returning a clean, stable response contract while adding Redis caching and resilient failure handling — the core pattern behind integration “glue” services.",
    overview:
      "A caching API gateway built in Django REST Framework. A client calls the service instead of the upstream API directly; the service checks a Redis cache first, and only on a miss does it call the GitHub API, reshape the response into a fixed contract it controls, and store the result in Redis with a TTL. This decouples consumers from the upstream — a change in GitHub's response only requires a single-point fix, never a change in every caller. The service bounds outbound calls with timeouts, retries transient failures with exponential backoff, and returns proper HTTP status codes instead of crashing. Built over a weekend to learn Django/DRF hands-on from a Flask background, mapping the concepts directly across frameworks.",
    tech: [
      "Python",
      "Django",
      "Django REST Framework",
      "Redis",
      "Docker",
      "requests",
      "REST APIs",
    ],
    features: [
      "Caching API gateway in Django REST Framework that fronts an upstream public API and returns a stable response contract, decoupling consumers from the upstream's shape",
      "Cache-aside caching with Redis (run in Docker) and TTL expiry: a cache hit skips the upstream entirely; a miss fetches, stores, and returns — cutting redundant calls and respecting the upstream's rate limit",
      "Resilience layer: bounded request timeouts, retry with exponential backoff on transient failures, and correct HTTP status codes (404 / 502 / 503) for graceful degradation",
      "Null-safe field mapping: a missing upstream field resolves to null rather than crashing the response, so the contract holds even with incomplete source data",
      "Flask → DRF concept mapping (routes → URL dispatcher, view functions → APIView, jsonify → Response) — a self-directed weekend build to learn the framework",
      "Reproducible environment via requirements.txt and a clean .gitignore (no committed virtualenv)",
    ],
    video: "/backendAndIntegration/djangoConnectoService/connector-demo.mp4",
    poster:
      "/backendAndIntegration/djangoConnectoService/drf-browsable-api.png",
    architecture:
      "/backendAndIntegration/djangoConnectoService/connector-service-architecture.png",
    architectureCaption:
      "Client → Connector Service (Django + DRF) → checks Redis (cache, TTL) → on a miss, calls the GitHub API (upstream) → reshapes the response into a clean, stable JSON contract returned to the client. Caching avoids redundant upstream calls; retry/backoff and proper status codes handle upstream failures gracefully.",
    gallery: [
      {
        src: "/backendAndIntegration/djangoConnectoService/drf-browsable-api.png",
        label: "DRF browsable API — the clean response contract",
      },
      {
        src: "/backendAndIntegration/djangoConnectoService/cache-proof.png",
        label: "Cache proof — miss, then served from Redis",
      },
      {
        src: "/backendAndIntegration/djangoConnectoService/redis-ttl.png",
        label: "Redis key with live time-to-live",
      },
    ],
    githubUrl: "https://github.com/ffumero2003/django-connector-service",
    lookerUrl: "", // optional — no dashboard for this one, leaves the button hidden
    linkedinUrl: "", // optional — paste your LinkedIn post link to show the button
  },

  {
    title: "Prompt Gate — Governed AI Image Generation",
    oneLiner:
      "An admission-controlled AI image pipeline: it gates every prompt on scope and budget before spending a cent, generates with OpenAI, uses a second LLM to grade and refine the result, and stores each image to the cloud with a tamper-proof provenance record — as both a CLI and a React web app.",
    overview:
      "A governed image-generation app built on the genblaze pipeline. Every prompt passes an admission gate before any money is spent: a persisted daily-run ledger caps generations per day, a cost guard bounds the worst-case run cost, and an OpenAI LLM classifies whether the prompt is an in-scope product shot. Only accepted prompts generate — OpenAI's gpt-image-1 creates the image, gpt-4o (vision) scores it 0–1 with written feedback, and if it misses the quality bar that feedback sharpens the prompt and it retries (up to 3 attempts). The winning image plus a provenance manifest — prompt, model, attempts, cost, and a content hash — are stored on Backblaze B2. One shared Python core powers two interfaces: a CLI and a React (Vite + Tailwind) web app served by FastAPI.",
    tech: [
      "Python",
      "FastAPI",
      "OpenAI API",
      "gpt-image-1",
      "gpt-4o",
      "Backblaze B2",
      "genblaze",
      "Pydantic",
      "React",
      "Vite",
      "Tailwind CSS",
      "uvicorn",
    ],
    features: [
      "Admission gate that rejects off-scope or over-budget prompts before any paid call, with a distinct exit code per reason",
      "LLM scope classifier (OpenAI) using structured JSON output plus a fail-closed, tolerant parser — an unconfirmed prompt never reaches paid generation",
      "Cost guard: a per-run worst-case cost ceiling computed fully offline from an app-priced model registry (no network, no API key)",
      "Persisted daily-run ledger enforcing a cross-run daily generation cap that survives between invocations — the real budget control a single-run check can't provide",
      "LLM-as-judge retry loop: gpt-4o scores each image 0–1 with feedback; below-threshold results retry with that feedback folded into the prompt (genblaze AgentLoop)",
      "Provenance: every stored image ships with a manifest (prompt, model, attempts, cost, and a content hash for tamper detection)",
      "One shared orchestration behind two interfaces (CLI + React/FastAPI web); everything provider-facing routes through the genblaze pipeline — no direct SDK / boto3 / raw HTTP",
    ],
    video: "/aiApplications/promptGate/prompt-gate.mp4",
    architecture: "/aiApplications/promptGate/architecture.png",
    architectureCaption:
      "Prompt → gate (daily-run ledger → cost guard → LLM scope classifier) → gpt-image-1 generation → gpt-4o scoring → retry-on-feedback loop (up to 3×) → Backblaze B2 storage with a provenance manifest. One shared Python core serves both a CLI and a React (Vite + Tailwind) frontend over a FastAPI /generate endpoint.",
    gallery: [
      {
        src: "/aiApplications/promptGate/web-ui.png",
        label: "React web UI — generated product shot",
      },
      {
        src: "/aiApplications/promptGate/terminal.png",
        label: "CLI — gate accept + rejections",
      },
      {
        src: "/aiApplications/promptGate/backblaze.png",
        label: "Backblaze B2 — stored images & manifests",
      },
    ],
    githubUrl: "https://github.com/ffumero2003/prompt-gate",
  },

  {
    title: "Retrieval Quality Benchmark - Smarter RAG vs Plain Vector Search",
    oneLiner:
      "Two search systems, the same documents, the same questions - and real numbers showing which one actually finds the right answer more often.",
    overview:
      "Most RAG projects bolt on reranking and hybrid search, then just assume things got better. This one measures it. I built a document set from Apple's latest 10-K filing (the risk factors and management discussion sections), split it into 134 pieces, and indexed those pieces two different ways. The first way is plain vector search - the standard approach. The second way has an AI model write a short summary of where each piece sits in the document before indexing it, then searches using both keyword matching and vector similarity, combines the two result lists, and finally reranks them with Cohere. Both systems get the exact same six questions. I wrote an answer key by hand with the exact sentences that count as correct, and the app shows both sets of results side by side with each one marked right or wrong. The smarter pipeline wins on every metric. This is search only - it doesn't write answers, so the numbers measure finding, not writing.",
    tech: [
      "Python",
      "RAG",
      "Chroma",
      "all-MiniLM-L6-v2",
      "OpenAI API",
      "Cohere Rerank",
      "BM25",
      "FastAPI",
      "React",
      "Vite",
      "pytest",
      "SEC EDGAR API",
    ],
    features: [
      "Both search systems read the exact same 134 pieces of text, split at the exact same points - so any difference in the scores comes from the search method and nothing else",
      "Before indexing, an AI model writes a one-line summary of where each piece sits in the document, so a paragraph that says 'these risks' still makes sense on its own",
      "Combines keyword search and vector search, merges the two ranked lists, then has Cohere reorder the finalists - each step is a standard technique, measured rather than assumed",
      "The results: plain vector search finds the answer 75% of the time; the upgraded pipeline finds it 100% of the time, and ranks it higher when it does",
      "An answer is only counted correct if the retrieved text contains the exact wording from the answer key - the AI-written summary never counts, so the score measures search quality and not the AI's writing",
      "Every result can be traced back to the original file and verified character by character, so nothing shown on screen is unverifiable",
      "A separate free-text box lets you ask anything, and those results are never scored - there is no answer key for a made-up question, so the app is built so it physically cannot mark them right or wrong",
      "398 backend tests and 42 frontend tests, including deliberate trap cases that fail if the app ever fakes a correct/incorrect mark instead of reading the real measured one",
    ],
    video: "/aiApplications/benchmarkRetrieval/benchmark-retrieval.mp4",
    architecture: "/aiApplications/benchmarkRetrieval/architecture.png",
    architectureCaption:
      "Apple's 10-K is downloaded from SEC EDGAR, trimmed to two sections, and split into 134 pieces. Those same pieces are indexed twice: once as-is, and once with an AI-written context line attached. A question then runs through both systems - the plain one does vector search, the upgraded one does keyword plus vector search, merges the results, and reranks them with Cohere. A scoring script grades both against a hand-written answer key, saves the numbers to a file, and the web app displays them side by side. A separate free-text search runs both systems live but is never scored.",
    gallery: [
      {
        src: "/aiApplications/benchmarkRetrieval/diff-q3.png",
        label:
          "Side by side - the plain search misses the answer, the upgraded one finds it",
      },
      {
        src: "/aiApplications/benchmarkRetrieval/scoreboard.png",
        label: "The measured scores for both systems",
      },
      {
        src: "/aiApplications/benchmarkRetrieval/eval-run.png",
        label: "The scoring script that produces every number in the app",
      },
    ],
    githubUrl: "https://github.com/ffumero2003/retrieval-benchmark",
    lookerUrl: "",
    linkedinUrl: "",
  },

  {
    // DRAFT COPY — overview and features are written from the project's tags and
    // short description, not from the repo. Review and correct before publishing.
    title: "ELD Trip Planner",
    oneLiner:
      "A full-stack trucking app that turns a trip into a compliant plan: it computes FMCSA Hours-of-Service logs, maps the multi-stop route with fuel and rest stops, and has Claude AI explain the reasoning behind each trip in plain English.",
    overview:
      "A full-stack application for commercial drivers, built on a Django REST backend with a React frontend. A driver enters a current location, pickup, dropoff, and hours already used in the current cycle; the backend plans the route, inserts the fuel and rest stops the trip requires, and computes the Hours-of-Service schedule against the FMCSA property-carrying rules — the 11-hour driving limit, the 14-hour on-duty window, the 30-minute break, and the 70-hour/8-day cycle. The result renders two ways: an interactive Leaflet map of the route with every stop plotted, and generated daily ELD log sheets. Claude AI sits on top of the computed plan and explains it — why a break lands where it does, which limit forced a stop — so the output is not just a schedule but a justified one. The compliance math stays deterministic in the backend; the model explains the result rather than producing it.",
    tech: [
      "React",
      "Vite",
      "Django",
      "Django REST Framework",
      "Python",
      "Claude AI",
      "Leaflet Maps",
      "REST APIs",
      "Tailwind CSS",
    ],
    features: [
      "Hours-of-Service engine implementing the FMCSA property-carrying rules — 11-hour driving limit, 14-hour on-duty window, mandatory 30-minute break, and the 70-hour/8-day cycle — computed deterministically in the backend",
      "Multi-stop route planning from current location → pickup → dropoff, with required fuel and rest stops inserted into the itinerary rather than left to the driver",
      "Interactive Leaflet map rendering the full route with every stop plotted and labeled",
      "Generated daily ELD log sheets reflecting the computed duty status across the trip",
      "Claude AI explains the finished plan in plain English — which regulation forced each stop and why the schedule falls where it does; the model explains the math, it never produces it",
      "Django REST API cleanly separated from the React client, so the compliance logic is testable independently of the UI",
    ],
    // Placeholder: no demo recorded yet. Set `video` to the .mp4 path once it exists
    // and the card switches from the still image to the video hero automatically.
    video: EldTripPlannerVideo,
    videoComingSoon: true,
    poster: EldTripPlanner,
    githubUrl: "https://github.com/ffumero2003/eld-trip-planner",
    liveUrl: "https://eld-trip-planner-omega.vercel.app/",
  },

];

// Lead project section for the portfolio. Reorder PROJECTS above to change
// the order the cards appear in.
export default function SoftwareEngineeringAI() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-12"
      id="software-engineering-ai"
    >
      <h2 className="text-2xl md:text-4xl font-bold mb-2 text-[var(--color-text)]">
        Software Engineering &amp; AI
      </h2>
      <p className="text-sm md:text-base text-[var(--color-text)]/70 mb-6 md:mb-8">
        Backend services, integrations, and AI systems — signed-URL storage,
        caching gateways, governed LLM pipelines, and measured retrieval.
      </p>

      <div className="space-y-6 md:space-y-8">
        {PROJECTS.map((p) => (
          <ProjectDeepCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}
