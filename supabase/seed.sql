-- ============================================================
-- Portfolio Seed Data
-- Run AFTER migration.sql
-- Supabase Studio → SQL Editor → New Query → Run
-- ============================================================

-- ─── Blog Posts ───────────────────────────────────────────────────────────────
insert into blog_posts (slug, title, date, read_time, category, image, excerpt, content, tags, related, published)
values
(
  'brand-identity-with-code',
  'Brand Identity with Code',
  'April 28, 2020',
  '6 min read',
  'Code',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
  'How modern developers are becoming the new brand designers — using code as a creative medium for identity.',
  '[
    {"type":"paragraph","text":"There''s a quiet revolution happening at the intersection of engineering and design. Developers are crafting brand identities that are alive, reactive, and expressive."},
    {"type":"heading","text":"The Shift from Static to Dynamic"},
    {"type":"paragraph","text":"Traditional brand identity relied on static assets. In a world where every touchpoint is a screen, brands now live in motion."},
    {"type":"quote","text":"Design is not just what it looks like and feels like. Design is how it works."},
    {"type":"paragraph","text":"CSS has evolved into an animation engine. Framer Motion, GSAP, and Three.js make extraordinary things possible."},
    {"type":"heading","text":"Code as a Creative Medium"},
    {"type":"paragraph","text":"The easing curve of a button press, the stagger of a list reveal — these are brand decisions that communicate personality."}
  ]'::jsonb,
  array['Branding','CSS','React','Design Systems'],
  array['data-center-infrastructure','creative-workflow'],
  true
),
(
  'data-center-infrastructure',
  'Data Center Infrastructure',
  'April 28, 2020',
  '8 min read',
  'Design',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
  'A deep dive into the architecture decisions that power modern data centers.',
  '[
    {"type":"paragraph","text":"Modern data centers are engineering marvels. Architectural decisions directly influence how software is built and deployed."},
    {"type":"heading","text":"The Physical Layer"},
    {"type":"paragraph","text":"Every cloud API call touches physical hardware. Understanding redundant power and fiber interconnects gives distributed systems intuition."},
    {"type":"quote","text":"The network is the computer — and the data center is its home."},
    {"type":"paragraph","text":"Availability zones exist because hardware fails. Regions exist because latency is physical."},
    {"type":"heading","text":"What Developers Should Know"},
    {"type":"paragraph","text":"Understand the blast radius of failure and build graceful degradation for the failures you cannot predict."}
  ]'::jsonb,
  array['Infrastructure','Cloud','AWS','Architecture'],
  array['brand-identity-with-code','creative-workflow'],
  true
),
(
  'creative-workflow',
  'Creative Workflow for Developers',
  'April 28, 2020',
  '5 min read',
  'Music',
  'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&auto=format&fit=crop',
  'Borrowing from musicians and artists to build a creative workflow that sparks innovation.',
  '[
    {"type":"paragraph","text":"The best engineers have a creative practice outside code. That practice bleeds into how they solve technical problems."},
    {"type":"heading","text":"The Yes And Rule"},
    {"type":"paragraph","text":"Improv comedians live by Yes And. Before saying impossible, say yes, and here is what we would need."},
    {"type":"quote","text":"Creativity is not about inspiration. It is about showing up every day and doing the work."},
    {"type":"paragraph","text":"Musicians practice scales not because scales are music, but to build muscle memory for free playing."},
    {"type":"heading","text":"Building Your Practice"},
    {"type":"paragraph","text":"Schedule creative time like meetings. Block it. Use it to explore technologies with no business case."}
  ]'::jsonb,
  array['Creativity','Workflow','Productivity','Career'],
  array['brand-identity-with-code','data-center-infrastructure'],
  true
);

-- ─── Projects ─────────────────────────────────────────────────────────────────
insert into projects (slug, title, subtitle, category, image, year, duration, role, client, tags, overview, challenge, solution, outcomes, tech_stack, gallery, live_url, github_url, related, published, "order")
values
(
  'data-pipeline-aws',
  'Real-Time Data Pipeline',
  'AWS · Python · Kafka',
  array['AWS','PYTHON'],
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
  '2024', '4 months', 'Lead Data Engineer', 'FinTech Startup',
  array['AWS','Python','Kafka','S3'],
  'Designed and implemented a fully managed real-time data ingestion pipeline processing 500K+ events per minute.',
  'The client had siloed data in 8 systems. Batch processing caused 6-hour delays in fraud detection.',
  'Architected a streaming pipeline using Amazon Kinesis for ingestion, Lambda for transformations, and S3/Redshift for storage.',
  array['Reduced latency from 6 hours to 30 seconds','Processed 500K+ events/min','Decreased fraud detection time by 94%','99.98% pipeline uptime'],
  '{"Ingestion":["Amazon Kinesis","Apache Kafka"],"Processing":["AWS Lambda","Python 3.11"],"Storage":["Amazon S3","Redshift"]}'::jsonb,
  array['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop','https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop'],
  '#', '#',
  array['sales-analytics-dashboard','ml-fraud-detection'],
  true, 1
),
(
  'sales-analytics-dashboard',
  'Sales Analytics Dashboard',
  'SQL · Power BI · Azure',
  array['SQL','AZURE'],
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
  '2023', '3 months', 'Data Engineer & BI Developer', 'Retail Chain (120 stores)',
  array['SQL','Azure','Power BI'],
  'Comprehensive sales analytics platform on Azure consolidating 120 retail stores with real-time KPIs.',
  'Store managers used outdated weekly reports. Data team spent 60% of time on manual reporting.',
  'Deployed Azure Synapse for warehouse, dbt for transformations, Power BI Embedded for dashboards.',
  array['Reports: 8 hours → 15 minutes','Inventory accuracy +35%','25 analyst-hours/week saved','120 stores deployed in 6 weeks'],
  '{"Data Warehouse":["Azure Synapse Analytics"],"Transformation":["dbt Core","SQL"],"Visualization":["Power BI","Power BI Embedded"]}'::jsonb,
  array['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop','https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop'],
  '#', '#',
  array['data-pipeline-aws','azure-data-warehouse'],
  true, 2
),
(
  'ml-fraud-detection',
  'ML Fraud Detection System',
  'Python · scikit-learn · AWS',
  array['PYTHON','AWS'],
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop',
  '2023', '5 months', 'Machine Learning Engineer', 'Digital Payments Company',
  array['Python','ML','AWS Lambda','scikit-learn'],
  'ML fraud detection engine scoring transactions in under 100ms with 98.7% precision.',
  'Company losing $400K monthly. Rule-based system had 18% false positive rate and 12% miss rate.',
  'Ensemble model combining gradient boosting and neural networks deployed via AWS SageMaker and Lambda scoring API.',
  array['Fraud losses reduced 89%','False positives: 18% → 2.3%','Average latency: 47ms','Weekly model retraining'],
  '{"Modeling":["scikit-learn","XGBoost","TensorFlow"],"Deployment":["AWS SageMaker","Lambda","API Gateway"]}'::jsonb,
  array['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop','https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop'],
  '#', '#',
  array['data-pipeline-aws','customer-segmentation'],
  true, 3
),
(
  'azure-data-warehouse',
  'Azure Data Warehouse',
  'Azure Synapse · SQL · dbt',
  array['AZURE','SQL'],
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
  '2022', '6 months', 'Data Architect', 'Enterprise Manufacturer',
  array['Azure','SQL','dbt','Synapse'],
  'Legacy Oracle warehouse migrated to Azure Synapse Analytics for 200+ self-service users.',
  'End-of-life Oracle warehouse with $800K annual maintenance. Degrading query performance.',
  'Phased migration using medallion architecture (Bronze/Silver/Gold) with dbt for transformation management.',
  array['Cost reduced 65%','Queries 10x faster','200+ self-service users onboarded','Zero data loss'],
  '{"Data Warehouse":["Azure Synapse","Data Lake Gen2"],"Transformation":["dbt Cloud","SQL","Spark"],"BI Layer":["Power BI Premium"]}'::jsonb,
  array['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop','https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop'],
  '#', '#',
  array['sales-analytics-dashboard','data-pipeline-aws'],
  true, 4
),
(
  'customer-segmentation',
  'Customer Segmentation Model',
  'Python · K-Means · SQL',
  array['PYTHON','SQL'],
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
  '2023', '3 months', 'Data Scientist', 'E-commerce Platform',
  array['Python','SQL','K-Means','Tableau'],
  'K-Means + RFM analysis on 2M+ records enabling hyper-targeted marketing with 31% higher conversion.',
  'Same campaign sent to all 2M customers. High unsubscribes, no high-value segment visibility.',
  'SQL RFM scoring + K-Means clustering identified 8 personas. Tableau dashboard for marketing teams.',
  array['8 actionable personas identified','Email conversion +31%','Churn prediction 82% accuracy','Team self-sufficient in 2 weeks'],
  '{"Data":["SQL","PostgreSQL","Python"],"Modeling":["scikit-learn","K-Means"],"Visualization":["Tableau","Plotly"]}'::jsonb,
  array['https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop','https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop'],
  '#', '#',
  array['ml-fraud-detection','sales-analytics-dashboard'],
  true, 5
),
(
  'developer-portfolio',
  'Developer Portfolio Platform',
  'React · TypeScript · Node.js',
  array['PYTHON'],
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
  '2024', '2 months', 'Full Stack Developer', 'Personal Project',
  array['React','TypeScript','Node.js','Supabase'],
  'Full-stack portfolio with React + Node.js CMS backend, visitor analytics, and automated CI/CD.',
  'Existing builders too rigid. Needed live demos, notebook embeds, and visitor engagement tracking.',
  'Custom React + TypeScript frontend. Lightweight Node.js/Express CMS with PostgreSQL. Supabase backend.',
  array['Shipped in 8 weeks solo','Lighthouse score 99/100','Zero-downtime CI/CD pipeline','3 client inquiries in month 1'],
  '{"Frontend":["React 18","TypeScript","Tailwind CSS"],"Backend":["Node.js","Express","Supabase"],"DevOps":["GitHub Actions","Vercel"]}'::jsonb,
  array['https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=600&auto=format&fit=crop','https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop'],
  '#', '#',
  array['ml-fraud-detection','customer-segmentation'],
  true, 6
);

-- ─── Resume ───────────────────────────────────────────────────────────────────
insert into resume (name, title, email, phone, location, summary, experience, education, skills, certifications)
values (
  'Chukwudi Vincent',
  'Data Scientist & Full Stack Developer',
  'andrewvincentfreelanceacademy@gmail.com',
  '+234 812 111 16 68',
  'Lagos, Nigeria',
  'Passionate data scientist and full stack developer with 6+ years of experience building data-driven applications and scalable web systems. Expert in Python, SQL, React, and cloud infrastructure.',
  '[
    {"role":"Senior Data Scientist","company":"TechCorp Analytics","period":"2022 – Present","location":"Lagos, Nigeria","bullets":["Led end-to-end ML pipeline development reducing inference time by 40%","Built real-time dashboards serving 50K+ daily users","Managed a team of 3 junior data scientists"]},
    {"role":"Full Stack Developer","company":"DataBridge Solutions","period":"2020 – 2022","location":"Abuja, Nigeria","bullets":["Architected B2B SaaS platform handling $2M+ annually","Integrated 12+ third-party APIs including payment gateways","Reduced page load time by 65%"]},
    {"role":"Junior Developer","company":"Freelance","period":"2018 – 2020","location":"Remote","bullets":["Built 20+ client websites across e-commerce and SaaS","Data analysis and reporting for SMEs using Python and Excel"]}
  ]'::jsonb,
  '[
    {"degree":"B.Sc. Computer Science","school":"University of Lagos","period":"2014 – 2018","note":"First Class Honours"},
    {"degree":"Data Science Certificate","school":"Coursera / IBM","period":"2019","note":"ML, Data Visualization, Python"}
  ]'::jsonb,
  '{
    "Languages & Frameworks":["Python","TypeScript","React","Node.js","FastAPI","Django"],
    "Data & ML":["Pandas","NumPy","scikit-learn","TensorFlow","SQL","PostgreSQL","MongoDB"],
    "Cloud & DevOps":["AWS","Azure","Docker","GitHub Actions","Vercel","Terraform"],
    "Design":["Figma","Tailwind CSS","Framer Motion"]
  }'::jsonb,
  '[
    {"name":"AWS Certified Solutions Architect","issuer":"Amazon Web Services","year":"2023"},
    {"name":"Azure Data Fundamentals","issuer":"Microsoft","year":"2022"},
    {"name":"Professional Data Engineer","issuer":"Google Cloud","year":"2021"}
  ]'::jsonb
);
