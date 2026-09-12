import { Campaign } from '../types';

export const mockCampaigns: Campaign[] = [
  {
    id: 'camp-101',
    name: 'Q3 DevTools Adoption & Free Tier Signups',
    brandName: 'CloudMetrics Inc.',
    brandLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&q=80',
    status: 'active',
    objective: 'Product Signups',
    totalBudget: 2200,
    startDate: '2026-08-15',
    endDate: '2026-09-30',
    stats: {
      totalImpressions: 58400,
      totalClicks: 2180,
      totalLeads: 294,
      cpc: 1.01,
      pipelineValue: 48500,
    },
    brief: {
      productName: 'CloudMetrics Observability',
      productUrl: 'https://cloudmetrics.dev',
      targetIcp: 'Staff / Senior DevOps, SREs, Engineering Directors at Series A-C SaaS companies with multi-cluster Kubernetes deployments.',
      keyTalkingPoints: [
        'Cut observability bill by 60% without dropping telemetry spans or log fidelity.',
        'Zero-overhead eBPF auto-instrumentation in under 3 minutes.',
        'No per-gigabyte penalization — transparent flat developer pricing.',
      ],
      hooksToTest: [
        'The Datadog bill shock moment when you scale Kubernetes',
        'Why distributed tracing usually fails in production',
        'How eBPF changes the observability game forever',
      ],
      dos: [
        'Share authentic personal engineer perspective or real war story',
        'Mention the 3-minute installation speed via single Helm chart',
        'Include the free forever tier for up to 5 clusters',
        'Tag @CloudMetrics in the post body',
      ],
      donts: [
        'Do not sound like a sales rep reading a feature sheet',
        'Do not compare negatively against specific competitor names in an unprofessional way',
        'Do not use generic buzzwords like "synergy" or "game-changer"',
      ],
      ctaText: 'Spin up a free cluster dashboard in 3 minutes (link in comments/bio)',
      destinationUrlWithUtm: 'https://cloudmetrics.dev/try-free?utm_source=linkedin&utm_medium=creator&utm_campaign=q3-devs',
    },
    creators: [
      {
        creatorId: 'creator-1',
        creatorName: 'Sarah Chen',
        creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        stage: 'published',
        deliverableType: 'Document Carousel',
        scheduledDate: '2026-08-20',
        postCopy: `The hardest part of Kubernetes isn't deployment. It's figuring out why pod p99 latency spiked 400ms at 2:00 AM on Sunday.

Last year our team had 4 different observability dashboards open:
- APM traces in one tab
- Container metrics in another
- Log streams buffering in a third

And our monthly bill looked like an executive salary.

Here is the exact architecture change we made to switch to eBPF auto-instrumentation without touching application code. We saved $48k/quarter and cut incident MTTR from 45 min to under 6 minutes.

Slide 1-6 breakdown attached.

If you run K8s, CloudMetrics gives you instant zero-config tracing. Check the link in the first comment to try their free cluster tier.

#Kubernetes #DevOps #Observability #CloudEngineering #SRE`,
        assetUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        publishedPostUrl: 'https://linkedin.com/feed/update/urn:li:activity:7198293847291',
        performance: {
          impressions: 34200,
          clicks: 1420,
          ctr: 4.15,
          leads: 198,
          spend: 650,
        },
      },
      {
        creatorId: 'creator-8',
        creatorName: 'Julian Thorne',
        creatorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
        stage: 'draft_submitted',
        deliverableType: 'Text + Custom Visual',
        scheduledDate: '2026-09-15',
        postCopy: `Stop adding 40 lines of boilerplate SDK instrumentation to every microservice in Go.

Most developers spend more time debugging their OpenTelemetry exporter than building features.

I spent Sunday testing eBPF kernel tracing with CloudMetrics.
Here is what surprised me:
1. Deployed 1 Helm daemonset
2. Within 90 seconds, all HTTP & gRPC service maps auto-rendered
3. Zero CPU overhead (<0.8%) on high-throughput nodes

Clean, fast, and sensible. If you manage Go or Rust microservices, check out the free tier. Link is in the comments!

#SoftwareEngineering #GoLang #CloudNative #DevTools`,
        assetUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        feedbackNotes: [
          'Brand note: Draft looks super solid Julian! Just remember to include the link in the first comment with the provided UTM.',
        ],
      },
      {
        creatorId: 'creator-10',
        creatorName: 'Henrik Lindqvist',
        creatorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        stage: 'scheduled',
        deliverableType: 'Text + Custom Visual',
        scheduledDate: '2026-09-22',
        postCopy: `FinOps reality check: Observability should not cost more than 15% of your core compute spend.

If your monitoring bill is outpacing your AWS EC2 spend, you have an architectural misalignment.

Breakdown on how modern eBPF and decoupled storage reduce log indexing tax by 60% coming this Tuesday...`,
      },
    ],
  },
  {
    id: 'camp-102',
    name: 'Outbound 2.0 Playbook — RevOps ICP Campaign',
    brandName: 'PipelineForge',
    brandLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=80&q=80',
    status: 'active',
    objective: 'Qualified Pipeline',
    totalBudget: 1580,
    startDate: '2026-09-01',
    endDate: '2026-10-15',
    stats: {
      totalImpressions: 42100,
      totalClicks: 1640,
      totalLeads: 186,
      cpc: 0.96,
      pipelineValue: 74000,
    },
    brief: {
      productName: 'PipelineForge Signal-Based GTM',
      productUrl: 'https://pipelineforge.io',
      targetIcp: 'VPs of Sales, Heads of Revenue Operations, CROs at B2B Tech companies (50-500 employees).',
      keyTalkingPoints: [
        'Volume-based cold spam is burned out. High-intent signals win deals.',
        'Detect when target accounts hire new leadership or evaluate competitors.',
        'Automated multi-channel sequencing triggered by real buyer intent.',
      ],
      hooksToTest: [
        'Why sending 10,000 cold emails a week is killing your domain reputation',
        'How our 3-person SDR team outbooked a 15-person SDR team',
        'The RevOps tech stack teardown for 2026',
      ],
      dos: [
        'Include real workflow diagrams or screenshots',
        'Speak directly to RevOps pain: data hygiene, tool sprawl, missed quota',
        'Direct readers to the free GTM Signal Checklist',
      ],
      donts: [
        'No unrealistic promises like "10x your revenue overnight"',
        'Avoid making it look like a generic sponsored ad',
      ],
      ctaText: 'Grab the free 2026 GTM Signal Blueprint (link in comments)',
      destinationUrlWithUtm: 'https://pipelineforge.io/blueprint?utm_source=linkedin&utm_medium=creator&utm_campaign=outbound2',
    },
    creators: [
      {
        creatorId: 'creator-2',
        creatorName: 'Marcus Vance',
        creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        stage: 'published',
        deliverableType: 'Document Carousel',
        scheduledDate: '2026-09-04',
        postCopy: `Most CROs think they have a sales rep performance problem.
In 85% of audits, they actually have an account selection problem.

When your reps spend 70% of their day reaching out to accounts that aren't in-market, response rates plummet below 1.2%.

We flipped the model:
Instead of static Apollo lists, we set up 4 intent triggers:
1. Executive hiring on LinkedIn
2. Tech stack changes (G2 / BuiltWith)
3. Website pricing page visits (>2 visits in 7 days)
4. Competitor review engagement

Result: Reply rates climbed from 1.8% to 11.4%.

Full step-by-step workflow attached in the slides.
Built in partnership with PipelineForge — link in the comments for their free ICP Intent Playbook!

#RevOps #B2BSales #SalesLeadership #GTM`,
        assetUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        publishedPostUrl: 'https://linkedin.com/feed/update/urn:li:activity:7199402837190',
        performance: {
          impressions: 26800,
          clicks: 1180,
          ctr: 4.4,
          leads: 134,
          spend: 520,
        },
      },
      {
        creatorId: 'creator-9',
        creatorName: 'Priya Narang',
        creatorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
        stage: 'brand_review',
        deliverableType: 'Document Carousel',
        scheduledDate: '2026-09-18',
        postCopy: `The dirty secret of B2B demand generation in 2026:
Cold email CAC has doubled, and LinkedIn sponsored feed ads now cost $14+ per click.

If you are not tapping into practitioner-led creator distribution and intent triggers, you are overpaying by 300%.

Here is the exact framework we used to generate $320k in pipeline with PipelineForge at a $34 blended cost per qualified demo.

Slide 1: Intent signals that matter
Slide 2: Personalizing the first 50 words
Slide 3: Timing the outreach
Slide 4: Attribution tracking that the CFO trusts

Check out the full slides! Link in comments to duplicate our template.

#DemandGen #B2BMarketing #GrowthHacking #SaaS`,
        assetUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        feedbackNotes: [],
      },
    ],
  },
  {
    id: 'camp-103',
    name: 'Enterprise AI Stack & Vector Evaluation Launch',
    brandName: 'Quantix AI',
    brandLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&q=80',
    status: 'in_review',
    objective: 'Qualified Pipeline',
    totalBudget: 1800,
    startDate: '2026-09-10',
    endDate: '2026-10-30',
    stats: {
      totalImpressions: 12400,
      totalClicks: 520,
      totalLeads: 62,
      cpc: 1.25,
      pipelineValue: 28000,
    },
    brief: {
      productName: 'Quantix RAG Benchmark Suite',
      productUrl: 'https://quantix.ai/benchmark',
      targetIcp: 'Heads of AI, Staff Machine Learning Engineers, VP Technology evaluating enterprise retrieval-augmented generation.',
      keyTalkingPoints: [
        'Evaluate RAG hallucination rates across 10,000 queries in minutes.',
        'Compare embedding models with statistical significance.',
        'Continuous production drift detection for enterprise LLMs.',
      ],
      hooksToTest: [
        'Why most enterprise RAG prototypes fail in production',
        'How to benchmark embedding latency vs accuracy',
      ],
      dos: ['Technical rigor', 'Include code or architecture benchmarks'],
      donts: ['No superficial AI hype'],
      ctaText: 'Run the open-source benchmark suite on GitHub (link in comments)',
      destinationUrlWithUtm: 'https://quantix.ai/benchmark?utm_source=linkedin&utm_medium=creator',
    },
    creators: [
      {
        creatorId: 'creator-3',
        creatorName: 'Elena Rostova',
        creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        stage: 'draft_submitted',
        deliverableType: 'Document Carousel',
        scheduledDate: '2026-09-20',
        postCopy: `Enterprise AI leaders: how do you know your RAG system hasn't started hallucinating after the last knowledge base sync?

Most teams rely on 'vibe checks' with 15 test prompts. That is not engineering; that is gambling with customer trust.

Here is the automated evaluation pipeline we built with Quantix AI:
1. Automated ground-truth query generator
2. Context recall & precision metrics
3. Reranker latency benchmarking

Results on 15k enterprise documents attached.
Link in the comments to explore the benchmark!

#GenerativeAI #MachineLearning #LLMs #DataScience`,
        assetUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
];
