import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const passwordHash = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@tactyqal.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@tactyqal.com',
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'product-strategy' },
      update: {},
      create: {
        name: 'Product Strategy',
        slug: 'product-strategy',
        description: 'Guides on product discovery, validation, and roadmap planning.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'engineering' },
      update: {},
      create: {
        name: 'Engineering',
        slug: 'engineering',
        description: 'Technical deep-dives, architecture patterns, and code quality.',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'startup-growth' },
      update: {},
      create: {
        name: 'Startup Growth',
        slug: 'startup-growth',
        description: 'Fundraising, user acquisition, and scaling strategies.',
      },
    }),
  ]);

  console.log('✅ Created categories:', categories.map(c => c.name).join(', '));

  // Seed Tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'no-code' },
      update: {},
      create: { name: 'No-Code', slug: 'no-code' },
    }),
    prisma.tag.upsert({
      where: { slug: 'entrepreneurship' },
      update: {},
      create: { name: 'Entrepreneurship', slug: 'entrepreneurship' },
    }),
    prisma.tag.upsert({
      where: { slug: 'college-admissions' },
      update: {},
      create: { name: 'College Admissions', slug: 'college-admissions' },
    }),
    prisma.tag.upsert({
      where: { slug: 'app-building' },
      update: {},
      create: { name: 'App Building', slug: 'app-building' },
    }),
  ]);
  console.log('✅ Created tags:', tags.map(t => t.name).join(', '));

  // Seed Sample Tactyqal Labs Articles
  const catStrategy = categories.find(c => c.slug === 'product-strategy')!;
  const catEngineering = categories.find(c => c.slug === 'engineering')!;
  const catGrowth = categories.find(c => c.slug === 'startup-growth')!;

  const post1 = await prisma.post.upsert({
    where: { slug: 'how-high-schoolers-build-mvps-in-8-weeks' },
    update: {},
    create: {
      title: 'How High School Builders Go From Idea to Launched MVP in 8 Weeks',
      slug: 'how-high-schoolers-build-mvps-in-8-weeks',
      excerpt: 'Discover the step-by-step roadmap that empowers teenagers to identify authentic problems, prototype interfaces, and launch functional software products.',
      content: '<h2>The Shift From Passive Consumers to Active Creators</h2><p>For decades, computer science education in schools was limited to abstract syntax and theoretical exercises. Students learned loops, conditionals, and textbook algorithms, but rarely experienced the exhilarating reality of shipping an application into the hands of real users.</p><p>Tactyqal Labs was built on a different premise: teenagers possess untamed creative instincts and genuine empathy for community problems. When given 1:1 mentorship and modern no-code architectures, they can build viable solutions faster than most traditional engineering teams.</p><h2>The 4-Stage Accelerator Roadmap</h2><ul><li><strong>Weeks 1-2: Ideation & Market Validation:</strong> Deep-dive interviews, customer discovery, and value proposition testing.</li><li><strong>Weeks 3-4: Design & Interactive Prototyping:</strong> Visual hierarchy, wireframing, and user journey mapping.</li><li><strong>Weeks 5-6: No-Code Development & Database Architecture:</strong> Data modeling, relational schema setup, and API integrations.</li><li><strong>Weeks 7-8: Deployment & User Acquisition:</strong> Domain connection, mobile optimization, and onboarding early adopters.</li></ul><h2>Real Outcomes</h2><p>From agricultural diagnostic utilities like KrishiDrishti to ethical fashion marketplaces like Elenor Vegan Handbags, students prove that age is no barrier to engineering real software.</p>',
      status: 'PUBLISHED',
      authorId: admin.id,
      categoryId: catStrategy.id,
      metaTitle: 'How High School Builders Build MVPs in 8 Weeks — Tactyqal Labs',
      metaDescription: 'Discover how teenagers go from zero code to launching full-stack products with 1:1 mentorship.',
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  });

  const post2 = await prisma.post.upsert({
    where: { slug: 'why-no-code-is-the-secret-weapon-for-young-founders' },
    update: {},
    create: {
      title: 'Why No-Code is the Secret Weapon for the Next Generation of Founders',
      slug: 'why-no-code-is-the-secret-weapon-for-young-founders',
      excerpt: 'Syntax is no longer the bottleneck. Learn why modern visual development tools unlock unprecedented speed and product iteration for young entrepreneurs.',
      content: '<h2>Removing the Syntax Wall</h2><p>Historically, the biggest barrier to building software was the steep learning curve of programming languages. Young builders with brilliant ideas often spent months struggling with environment configurations, semicolons, and build pipelines before ever seeing their idea come to life.</p><p>Visual development platforms have democratized software creation without sacrificing architectural rigor. Relational databases, dynamic queries, webhook handlers, and responsive frontends can now be assembled visually.</p><h2>Focusing on What Truly Matters</h2><p>By abstracting boilerplate code, students can dedicate 90% of their energy to solving the actual user problem: validating hypotheses, designing intuitive user journeys, and gathering feedback from customers.</p>',
      status: 'PUBLISHED',
      authorId: admin.id,
      categoryId: catEngineering.id,
      metaTitle: 'Why No-Code is the Secret Weapon for Young Founders — Tactyqal Labs',
      metaDescription: 'Learn why visual development platforms accelerate startup execution and founder learning.',
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  });

  const post3 = await prisma.post.upsert({
    where: { slug: 'beyond-grades-how-real-world-apps-transform-college-applications' },
    update: {},
    create: {
      title: 'Beyond Grades: How Shipping a Real Product Elevates University Admissions',
      slug: 'beyond-grades-how-real-world-apps-transform-college-applications',
      excerpt: 'Standardized test scores and high GPAs are common. What makes top tier applicants stand out is tangible evidence of initiative, resilience, and real-world impact.',
      content: '<h2>The Admissions Paradigm Shift</h2><p>Top universities across the globe are inundated with perfect GPA transcripts and high test scores. Admissions committees increasingly look for distinctive proof of initiative: students who independently spot problems, rally resources, and create value for others.</p><p>When an applicant presents an active application with real active users, verifiable metrics, and community impact, their candidacy immediately ascends into the top percentile of compelling profiles.</p><h2>The Tactyqal Portfolio Advantage</h2><p>Every student graduating from our 8-week cohort leaves with a live deployed product, a technical brief, and an authentic founder narrative that transforms college essays and interview conversations.</p>',
      status: 'PUBLISHED',
      authorId: admin.id,
      categoryId: catGrowth.id,
      metaTitle: 'Beyond Grades: Transforming College Admissions with Real Apps — Tactyqal Labs',
      metaDescription: 'How building and launching an app provides high school students an unfair advantage in university admissions.',
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  });

  // Link PostTags
  await prisma.postTag.deleteMany();
  await prisma.postTag.createMany({
    data: [
      { postId: post1.id, tagId: tags[0].id },
      { postId: post1.id, tagId: tags[3].id },
      { postId: post2.id, tagId: tags[0].id },
      { postId: post2.id, tagId: tags[1].id },
      { postId: post3.id, tagId: tags[2].id },
      { postId: post3.id, tagId: tags[1].id },
    ],
  });

  console.log('✅ Created articles and linked tags:', [post1.title, post2.title, post3.title].join(', '));
  console.log('🎉 Seeding completed.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });