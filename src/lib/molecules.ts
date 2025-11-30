export interface GalleryItem {
    id: string;
    title: string;
    category: string;
    tags: string[];
    description: string;
    url: string;
}

export const MOLECULE_GALLERY: GalleryItem[] = [
    {
        id: '1CRN',
        title: 'Crambin',
        category: 'Proteins',
        tags: ['Small', 'High Res', 'Plant'],
        description: 'A small seed storage protein from Abyssinian cabbage. High resolution standard.',
        url: 'https://files.rcsb.org/download/1CRN.pdb'
    },
    {
        id: '6VSB',
        title: 'SARS-CoV-2 Spike',
        category: 'Viruses',
        tags: ['Pandemic', 'Viral', 'Glycoprotein'],
        description: 'Prefusion 2019-nCoV spike glycoprotein with a single receptor-binding domain up.',
        url: 'https://files.rcsb.org/download/6VSB.pdb'
    },
    {
        id: '1GFL',
        title: 'Green Fluorescent Protein',
        category: 'Proteins',
        tags: ['Bioluminescence', 'Nobel Prize', 'Beta Barrel'],
        description: 'The famous GFP from Aequorea victoria jellyfish. Note the beta-barrel structure.',
        url: 'https://files.rcsb.org/download/1GFL.pdb'
    },
    {
        id: '4HHB',
        title: 'Hemoglobin',
        category: 'Proteins',
        tags: ['Blood', 'Oxygen', 'Tetramer'],
        description: 'Deoxyhemoglobin molecule which transports oxygen in the blood.',
        url: 'https://files.rcsb.org/download/4HHB.pdb'
    },
    {
        id: '1BNA',
        title: 'B-DNA Helix',
        category: 'DNA/RNA',
        tags: ['Genetics', 'Double Helix'],
        description: 'Structure of a B-DNA dodecamer. The classic double helix form.',
        url: 'https://files.rcsb.org/download/1BNA.pdb'
    },
    {
        id: '1K4C',
        title: 'Potassium Channel',
        category: 'Ion Channels',
        tags: ['Membrane', 'Transport', 'Ion'],
        description: 'Structure of the KcsA potassium channel from Streptomyces lividans.',
        url: 'https://files.rcsb.org/download/1K4C.pdb'
    },
    {
        id: '5B2I',
        title: 'CRISPR-Cas9',
        category: 'Enzymes',
        tags: ['Gene Editing', 'Large', 'Complex'],
        description: 'Crystal structure of Streptococcus pyogenes Cas9.',
        url: 'https://files.rcsb.org/download/5B2I.pdb'
    },
    {
        id: '1MBN',
        title: 'Myoglobin',
        category: 'Proteins',
        tags: ['Muscle', 'Oxygen', 'Historic'],
        description: 'Sperm whale myoglobin. The first protein structure ever determined.',
        url: 'https://files.rcsb.org/download/1MBN.pdb'
    },
    {
        id: '3PQR',
        title: 'Insulin',
        category: 'Hormones',
        tags: ['Human', 'Medical', 'Hexamer'],
        description: 'Human insulin hexamer complexed with zinc.',
        url: 'https://files.rcsb.org/download/3PQR.pdb'
    },
    {
        id: '1E9W',
        title: 'Amylase',
        category: 'Enzymes',
        tags: ['Digestion', 'Pancreatic'],
        description: 'Pancreatic alpha-amylase, an enzyme that breaks down starch.',
        url: 'https://files.rcsb.org/download/1E9W.pdb'
    },
    {
        id: '1GCN',
        title: 'Glucagon',
        category: 'Hormones',
        tags: ['Metabolism', 'Alpha Helix'],
        description: 'Glucagon molecule which regulates blood glucose levels.',
        url: 'https://files.rcsb.org/download/1GCN.pdb'
    },
    {
        id: '1CAG',
        title: 'Collagen',
        category: 'Structural',
        tags: ['Triple Helix', 'Skin', 'Connective'],
        description: 'Model of the collagen triple helix structure.',
        url: 'https://files.rcsb.org/download/1CAG.pdb'
    },
    {
        id: '7DDI',
        title: 'DNA Polymerase',
        category: 'Enzymes',
        tags: ['Replication', 'DNA', 'Complex'],
        description: 'Structure of DNA Polymerase performing replication.',
        url: 'https://files.rcsb.org/download/7DDI.pdb'
    }
];

