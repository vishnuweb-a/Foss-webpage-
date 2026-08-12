/**
 * The technology ecosystem for Scene 04.
 *
 * Modelled as a graph, not a list — the edges are the point. Rendering this as
 * a grid of cards is explicitly forbidden (rules.prd §03, FOSS.prd §10), so the
 * data itself carries relationships rather than just labels.
 */

export interface TechNode {
  id: string
  label: string
  /** Shown when the node is selected. One line, spoken over by the presenter. */
  body: string
  /** Rough narrative importance; drives node scale and label size only. */
  weight: 1 | 2 | 3
}

export interface TechLink {
  source: string
  target: string
  /** Why these two are connected — surfaced to assistive tech, not decoration. */
  relation: string
}

export const techNodes: TechNode[] = [
  { id: 'git', label: 'Git', body: 'Version control for your code.', weight: 3 },
  { id: 'github', label: 'GitHub', body: 'Where the work happens in the open.', weight: 3 },
  {
    id: 'linux',
    label: 'Linux',
    body: 'The operating system powering much of modern infrastructure.',
    weight: 3,
  },
  {
    id: 'ai',
    label: 'AI / ML',
    body: 'Build, experiment and contribute to intelligent systems.',
    weight: 3,
  },
  { id: 'web', label: 'Web', body: 'The most open platform ever shipped.', weight: 2 },
  { id: 'cloud', label: 'Cloud', body: 'Run what you build, anywhere.', weight: 2 },
  { id: 'devops', label: 'DevOps', body: 'Ship it repeatedly, without fear.', weight: 2 },
  { id: 'databases', label: 'Databases', body: 'Where the state actually lives.', weight: 2 },
  { id: 'security', label: 'Cybersecurity', body: 'Read the code before you trust it.', weight: 2 },
  { id: 'automation', label: 'Automation', body: 'Do it once. Then never again.', weight: 1 },
  { id: 'apis', label: 'APIs', body: 'The contracts between systems.', weight: 1 },
  { id: 'tools', label: 'Developer Tools', body: 'Editors, shells, compilers — all open.', weight: 1 },
]

export const techLinks: TechLink[] = [
  { source: 'git', target: 'github', relation: 'GitHub hosts Git repositories' },
  { source: 'git', target: 'tools', relation: 'Git is a core developer tool' },
  { source: 'github', target: 'devops', relation: 'Pipelines run from the repository' },
  { source: 'github', target: 'automation', relation: 'Workflows automate the repo' },
  { source: 'linux', target: 'cloud', relation: 'Most cloud instances run Linux' },
  { source: 'linux', target: 'devops', relation: 'Deployment targets are Linux hosts' },
  { source: 'linux', target: 'security', relation: 'Open kernels can be audited' },
  { source: 'linux', target: 'tools', relation: 'The shell is the original toolchain' },
  { source: 'cloud', target: 'devops', relation: 'Infrastructure as code' },
  { source: 'cloud', target: 'databases', relation: 'Managed and self-hosted data' },
  { source: 'web', target: 'apis', relation: 'The web is built on APIs' },
  { source: 'web', target: 'tools', relation: 'Browsers ship developer tools' },
  { source: 'apis', target: 'databases', relation: 'APIs expose stored state' },
  { source: 'apis', target: 'ai', relation: 'Models are consumed through APIs' },
  { source: 'ai', target: 'databases', relation: 'Training and retrieval need data' },
  { source: 'ai', target: 'cloud', relation: 'Training runs on rented compute' },
  { source: 'security', target: 'apis', relation: 'The boundary worth defending' },
  { source: 'security', target: 'devops', relation: 'Supply chain and secrets' },
  { source: 'automation', target: 'devops', relation: 'Automation is the practice' },
  { source: 'automation', target: 'tools', relation: 'Scripts glue the toolchain' },
  { source: 'databases', target: 'web', relation: 'Applications persist state' },
  { source: 'git', target: 'devops', relation: 'Every deploy starts at a commit' },
]
