export type PortfolioMetric={value:string;label:string;context:string;kind?:"measured"|"delivered"|"scope"}
export type CaseStudy={slug:string;sector:string;duration:string;title:string;summary:string;challenge:string;approach:string[];outcomes:string[];limits:string[];stack:string[];metrics:PortfolioMetric[];leadership:string[];resultStatement:string;proofStatus:string}
export const caseStudies:CaseStudy[]=[
{slug:"cybersecurity-agentic-engineering",sector:"Cybersecurity company",duration:"August 2026 · under four weeks",
 title:"From zero context to an AI-enabled engineering team in under one month.",
 summary:"Two engineers formed the delivery nucleus, learned a new business and engineering environment, established the joint working model, and put APM, specialist copilots, PR-producing agents and an adapted SDD workflow into everyday team use — inside August 2026.",
 challenge:"Start with no prior knowledge of the client, its codebase or delivery practices. Establish trust and collaboration with its engineering team; learn the business while simultaneously shipping the first working agent-assisted development workflows. Make the team more capable, rather than staging an impressive isolated demo.",
 approach:[
 "Two technical peers created a focused joint delivery team and defined fast feedback channels, responsibilities, shared context and collaboration agreements with the client's engineers.",
 "Mapped the business domain, repositories, architecture and engineering conventions while building a reusable corpus of team knowledge.",
 "Activated APM and working Backend, Frontend, QA and Gherkin/Cucumber copilots adapted to the team's actual workflows.",
 "Connected agent-driven code changes and pull requests to human review and quality checks.",
 "Adapted the SDD kit to real delivery: intent → specification → controlled implementation → PR → acceptance, with additional logical gates and Definition of Done.",
 "Enabled engineers to use the tools directly, transferred knowledge and fed feedback into the framework rather than leaving it as a consultant-only prototype."
 ],
 outcomes:[
 "An active agentic engineering workflow was put into use by the participating team within the one-month engagement, according to the delivery account.",
 "APM, practical role-based copilots and agents creating pull requests were made operational, not merely planned.",
 "A company-specific knowledge corpus and a collaboration model were established from an initial zero-context starting point.",
 "The team began applying a tailored SDD approach, Gherkin/QA verification, logical gates and Definition of Done inside the sprint.",
 "A wider seven-workstream improvement program was structured separately from the initial deployed capabilities."
 ],
 limits:[
 "The less-than-one-month time-to-use and team adoption are reported from the delivery engagement; public independent verification and a population-level adoption denominator are not available.",
 "The production-use statement refers to participating engineering workflows, not organization-wide rollout or unattended autonomy.",
 "Copilots and agent PRs remain subject to team review and delivery constraints; no audited ROI or productivity multiplier is claimed.",
 "The client's identity, source, business details, screenshots, names and access credentials are not published."
 ],
 stack:["Agentic SDLC","APM","Operational copilots","Backend / Frontend / QA","Gherkin / Cucumber","Pull request agents","SDD + Definition of Done","Knowledge corpus","Team enablement"],
 leadership:[
 "Co-founded the two-person technical nucleus with a colleague, with direct responsibility for getting the initiative moving quickly.",
 "Created a working agreement with the client's engineering team, making knowledge-sharing and fast decision-making part of delivery.",
 "Helped turn an unfamiliar engineering environment into a reusable, operational agentic development system.",
 "Drove adoption through hands-on engineering and collaboration rather than presenting a slide deck."
 ],
 resultStatement:"Team-level AI-assisted engineering was operational and being used in less than one month, based on the delivery team's account.",
 proofStatus:"Delivered operational workflows and team adoption reported by the project team; not externally audited.",
 metrics:[
 {value:"< 1 month",label:"Time to use",context:"Participating engineers began using the activated agentic development workflows in August 2026 (delivery-team account)",kind:"delivered"},
 {value:"2",label:"Initial engineers",context:"Joint delivery nucleus: the author and one technical colleague",kind:"delivered"},
 {value:"4",label:"Copilot disciplines",context:"Backend, Frontend, QA and Gherkin/Cucumber; role areas, not an exact number of independent services",kind:"delivered"},
 {value:"PRs",label:"Agent outputs",context:"Code changes and pull requests in the collaborative development workflow; exact count not published",kind:"delivered"},
 {value:"SDD",label:"Adapted workflow",context:"SDD kit improved with logical quality gates and Definition of Done",kind:"delivered"},
 {value:"7",label:"Further workstreams",context:"Program roadmap beyond the initial operational foundation",kind:"scope"}
 ]},
{slug:"banking-modernization-factory",sector:"Banking company",duration:"Four-week technical proof of concept",
 title:"I designed a deterministic factory to turn a legacy corpus into usable engineering knowledge.",
 summary:"A four-week PoC that used one bounded legacy module as a test slice for a corpus-wide architectural approach: inspect everything, recover meaning, build a canonical intermediate model, generate target assets deterministically and trace each output to evidence.",
 challenge:"The decisive problem was not converting one module. It was devising a method capable of attacking an entire legacy corpus: source, dependencies, screens, functions, contracts and configuration, with reproducibility and source-level traceability. One module served as the measurable PoC slice; generalization to a whole estate remained unproven.",
 approach:["Formulate the factory thesis: treat the legacy estate as a corpus to understand and normalize, not a sequence of manual file translations.","Map structural dependencies across Java, views, configuration and contracts; identify the smallest useful reference slice without narrowing the target architecture to that slice.","Design a canonical IR and code graph connecting source positions and hashes to reconstructed behavior and target assets.","Establish bounded deterministic generation stages for APIs, UI components, tests and documentation, producing repeatable outputs.","Audit files, consistency, test evidence and source lineage; explicitly enumerate gaps and last-mile environment dependencies.","Keep component-level delivery, cross-module extrapolation and unproven functional parity as distinct claims."],
 outcomes:["A corpus-first modernization architecture designed to extend beyond the one-module PoC slice, without claiming full-estate validation.","91 legacy functions reconstructed as structured knowledge artifacts (not 91 fully migrated implementations).","66 documented contract operations, 64 with internal API-test coverage; this does not establish execution in the customer's operational environment.","173 UI components derived from 197 analyzed legacy views; generated components are not automatically deployed microfrontends.","22,995 source-linked evidence references and 4,338 files compared under the declared reproducibility profile.","A four-week PoC with 168 reported human hours and explicit verification limitations."],
 limits:["Aggregate figures are drawn from internal PoC reporting and should receive disclosure clearance before public release. No customer name or identifying architecture is provided.","The reference slice was one module; a generalized multi-system factory was designed, not validated across every legacy application.","173 are generated UI components, not a claim that 173 independently deployed microfrontends exist.","64 tests are inside the bounded generated service; the number is not a production acceptance certificate.","4,338 comparisons check repeatability only under the declared profile, not end-to-end runtime equivalence.","Functional parity with the legacy application remains unproven; no claim of full migration, production replacement or financial savings."],
 stack:["Corpus-first reverse engineering","Java / JSF","Canonical IR and code graph","Deterministic generators","API contracts","Derived Angular components","Evidence and repeatability gates"],
 leadership:["Conceived the corpus-first factory approach: from understanding the whole legacy estate to an executable, repeatable modernization architecture.","Led the mental and technical decomposition into canonical knowledge, deterministic generation, contracts, evidence and gates.","Chose one bounded module as the proving ground for a strategy designed to scale to many systems.","Distinguished generated artifacts and reproducible output from unproven legacy behavioral equivalence."],
 resultStatement:"A four-week engineering proof of concept delivered a repeatable architecture and measurable artifacts from a reference module, with wider-estate ambitions explicitly separated from tested scope.",
 proofStatus:"Quantified bounded PoC engineering evidence; not equivalent to multi-system migration or production cutover.",
 metrics:[{value:"4 weeks",label:"PoC duration",context:"Four-week technical engagement; not production migration",kind:"delivered"},{value:"168 h",label:"Human effort",context:"Reported total human work for the proof of concept; not hours saved",kind:"measured"},{value:"173",label:"UI components",context:"Generated from 197 legacy views. Not 173 production microfrontends.",kind:"measured"},{value:"66",label:"Contract operations",context:"64 with internal API-test coverage; bounded generated service",kind:"measured"},{value:"91",label:"Legacy functions",context:"Represented in structured knowledge; not 91 functionally migrated implementations",kind:"measured"},{value:"22,995",label:"Source-linked evidence",context:"References with source location and hash in the PoC evidence corpus",kind:"measured"},{value:"4,338",label:"Files compared",context:"Repeatability comparison in a declared deterministic execution profile",kind:"measured"},{value:"703",label:"Agent instructions",context:"Human-issued agent instructions in the tracked work log; not API calls or savings",kind:"measured"},{value:"10 / 12",label:"Evidence criteria",context:"Acceptance criteria accompanied by evidence in the PoC documentation; 5 of 7 deliverables complete, 2 partial",kind:"measured"}]}
]
export type Lab={slug:string;title:string;eyebrow:string;summary:string;accent:string;demo:string;features:string[];note:string;metrics:PortfolioMetric[]}
export const interactiveLabs:Lab[]=[
{slug:"assetgraph",title:"AssetGraph · Frontier V14",eyebrow:"COMPUTER VISION / SENSOR FUSION / EVIDENCE",
 summary:"An overhead-intelligence decision console: image observation, tracked entities, confidence gates and evidence that can be audited—not just a pretty map.",accent:"#73d5e2",demo:"/labs/original/assetgraph.html",
 features:["Original Frontier V14 decision-object HTML","Overhead sensing, tracking and inspectable evidence","Separate product console V6, SAR research V12 and experimental Core 0.2.1 are different branches, not superseded by the V14 label"],
 note:"Frontier V14 is the highest-numbered overhead HTML in the recovered 12 October POWERPACK. Intelligence Console V6 (richer, 18.7 MB) is a parallel product-console branch; Core 0.2.1/C17 represent subsequent packaged engineering evidence. A higher HTML version does not imply the whole platform is production-ready.",
 metrics:[{value:"V14",label:"Frontier HTML",context:"Overhead decision-object branch (recovered 12 October)",kind:"delivered"},{value:"0.8555",label:"PETS09 IDF1",context:"Separate blind test, frames 61–120; not general operational accuracy",kind:"measured"},{value:"+8.19 pp",label:"Memory IDF1",context:"Independent identity lockbox: 0.576 → 0.658",kind:"measured"},{value:"98.72%",label:"SAR recall",context:"Frozen maritime stress window; not all sea states",kind:"measured"}]},
{slug:"montageos",title:"MontageOS · V6.4",eyebrow:"CINEMATIC PRODUCTION / MULTI-AGENT DIRECTION",
 summary:"A film nervous system: Cinema Brain, Living Bible, narrative memory, specialist judges, provider orchestration, shot timeline and editorial quality gates.",accent:"#e9ac72",demo:"/labs/original/montageos.html",
 features:["Cinema Brain + Living Bible for continuity and context","Multiple specialist review and governance gates","Narrative-to-shots timeline, provider workflow and export surfaces"],
 note:"Original 719 KB V6.4 film-production workspace. Some model/provider and media-rendering actions require external services or credits; the existence of a timeline is not evidence that a final film has been produced.",
 metrics:[{value:"V6.4",label:"Original film OS",context:"Recovered most advanced MontageOS HTML release",kind:"delivered"},{value:"719 KB",label:"HTML source",context:"Standalone source size (approximate, excluding remote media providers)",kind:"scope"},{value:"3",label:"Control layers",context:"Narrative context, orchestration and editorial quality; architectural grouping",kind:"scope"}]},
{slug:"roomforge",title:"RoomForge · V7",eyebrow:"SPATIAL AI / PHOTOGRAMMETRY / DIGITAL TWINS",
 summary:"From photos and walkthrough video toward a navigable 3D property twin: frames, camera geometry, depth, point clouds, SfM, Gaussian splats and exportable scenes.",accent:"#b7a6f7",demo:"/labs/original/roomforge.html",
 features:["Original Pure-JS V7 browser reconstruction laboratory","Optional remote VGGT and fallback visual-odometry/SfM/depth paths","An explicit separation of interactive rendering, remote inference and evidence of real scene reconstruction"],
 note:"Original V7 browser HTML. Full 3D Gaussian Splatting, COLMAP/SfM and GPU reconstruction can require external tools, credentials, suitable captures or compute; the accessible viewer is not evidence of a successful end-to-end reconstruction.",
 metrics:[{value:"V7",label:"Browser lab",context:"Standalone original HTML",kind:"delivered"},{value:"42 KB",label:"Source",context:"Original small browser artifact, external execution costs excluded",kind:"scope"},{value:"3D",label:"Target output",context:"Digital-twin visualization and editable spatial workflow",kind:"scope"}]},
{slug:"pumpum",title:"Pum Pum Café 3D",eyebrow:"PIXEL ART / LIVING 3D ENVIRONMENT",
 summary:"An animated and populated 3D café you can actually explore: characters, interactions, an in-world menu and changing light. An independent creative experiment, not a portfolio banner.",accent:"#f2c07d",demo:"/labs/original/pumpum.html",
 features:["Original navigable, character-rich café","Interaction hotspots and in-world menu","Dynamic lighting and spatial navigation"],
 note:"The original 97 KB Pum Pum HTML, not an assistant-created recreation. It uses Three.js r128 from CDN, requiring browser WebGL and a network connection.",
 metrics:[{value:"97 KB",label:"Original source",context:"HTML size, excluding Three.js loaded from a public CDN",kind:"scope"},{value:"3D",label:"Interactive café",context:"Actual browser-native environment with navigable characters",kind:"delivered"},{value:"4",label:"Lighting modes",context:"Real-time/day/afternoon/night states exposed by the source",kind:"scope"}]}
]