export interface GalleryItem {
    id: string;
    title: string;
    category: string;
    tags: string[];
    description: string;
    url: string;
}

export const MOLECULE_GALLERY: GalleryItem[] = [
    // Proteins - Enzymes
    {
        id: '1CRN',
        title: 'Crambin',
        category: 'Proteins',
        tags: ['Small', 'High Res', 'Plant', 'Thionin'],
        description: 'A small seed storage protein from Abyssinian cabbage. High resolution standard for crystallography.',
        url: 'https://files.rcsb.org/download/1CRN.pdb'
    },
    {
        id: '1GFL',
        title: 'Green Fluorescent Protein',
        category: 'Proteins',
        tags: ['Bioluminescence', 'Nobel Prize', 'Beta Barrel', 'Fluorescent'],
        description: 'The famous GFP from Aequorea victoria jellyfish. Note the beta-barrel structure and chromophore.',
        url: 'https://files.rcsb.org/download/1GFL.pdb'
    },
    {
        id: '4HHB',
        title: 'Hemoglobin',
        category: 'Proteins',
        tags: ['Blood', 'Oxygen', 'Tetramer', 'Heme'],
        description: 'Deoxyhemoglobin molecule which transports oxygen in the blood. Contains four subunits.',
        url: 'https://files.rcsb.org/download/4HHB.pdb'
    },
    {
        id: '1MBN',
        title: 'Myoglobin',
        category: 'Proteins',
        tags: ['Muscle', 'Oxygen', 'Historic', 'Heme'],
        description: 'Sperm whale myoglobin. The first protein structure ever determined by X-ray crystallography.',
        url: 'https://files.rcsb.org/download/1MBN.pdb'
    },
    {
        id: '1E9W',
        title: 'Amylase',
        category: 'Enzymes',
        tags: ['Digestion', 'Pancreatic', 'Glycosidase'],
        description: 'Pancreatic alpha-amylase, an enzyme that breaks down starch into sugars.',
        url: 'https://files.rcsb.org/download/1E9W.pdb'
    },
    {
        id: '8LYZ',
        title: 'Lysozyme',
        category: 'Enzymes',
        tags: ['Antibacterial', 'Egg White', 'Glycosidase'],
        description: 'Hen egg white lysozyme, breaks down bacterial cell walls. Model system for studies.',
        url: 'https://files.rcsb.org/download/8LYZ.pdb'
    },
    {
        id: '1TIM',
        title: 'Triosephosphate Isomerase',
        category: 'Enzymes',
        tags: ['Glycolysis', 'Catalytic Perfection', 'Barrel'],
        description: 'TIM barrel structure, considered an example of catalytic perfection in enzymes.',
        url: 'https://files.rcsb.org/download/1TIM.pdb'
    },
    {
        id: '1CEX',
        title: 'Chymotrypsin',
        category: 'Enzymes',
        tags: ['Protease', 'Digestive', 'Serine Protease'],
        description: 'Serine protease that digests proteins in the small intestine.',
        url: 'https://files.rcsb.org/download/1CEX.pdb'
    },
    {
        id: '1RBP',
        title: 'Retinol Binding Protein',
        category: 'Proteins',
        tags: ['Transport', 'Vitamin A', 'Beta Barrel'],
        description: 'Transports retinol (Vitamin A) in the blood plasma.',
        url: 'https://files.rcsb.org/download/1RBP.pdb'
    },

    // DNA/RNA Structures
    {
        id: '1BNA',
        title: 'B-DNA Helix',
        category: 'DNA/RNA',
        tags: ['Genetics', 'Double Helix', 'Canonical'],
        description: 'Structure of a B-DNA dodecamer. The classic right-handed double helix form.',
        url: 'https://files.rcsb.org/download/1BNA.pdb'
    },
    {
        id: '4R4V',
        title: 'A-DNA Helix',
        category: 'DNA/RNA',
        tags: ['Double Helix', 'Dehydrated', 'Wide Groove'],
        description: 'A-form DNA, wider and shorter than B-DNA, found in dehydrated conditions.',
        url: 'https://files.rcsb.org/download/4R4V.pdb'
    },
    {
        id: '2GKU',
        title: 'Z-DNA',
        category: 'DNA/RNA',
        tags: ['Left-handed', 'Zigzag', 'Alternative'],
        description: 'Left-handed DNA double helix with zigzag backbone. Alternative DNA form.',
        url: 'https://files.rcsb.org/download/2GKU.pdb'
    },
    {
        id: '1EHZ',
        title: 'tRNA',
        category: 'DNA/RNA',
        tags: ['Transfer RNA', 'Cloverleaf', 'Translation'],
        description: 'Yeast phenylalanine tRNA, shows characteristic L-shaped 3D structure.',
        url: 'https://files.rcsb.org/download/1EHZ.pdb'
    },
    {
        id: '1FFK',
        title: 'Ribozyme',
        category: 'DNA/RNA',
        tags: ['Catalytic RNA', 'Hammerhead', 'Enzyme'],
        description: 'Hammerhead ribozyme, an RNA molecule that catalyzes chemical reactions.',
        url: 'https://files.rcsb.org/download/1FFK.pdb'
    },

    // Membrane Proteins & Ion Channels
    {
        id: '1K4C',
        title: 'Potassium Channel',
        category: 'Ion Channels',
        tags: ['Membrane', 'Transport', 'Ion', 'Selectivity'],
        description: 'Structure of the KcsA potassium channel from Streptomyces lividans.',
        url: 'https://files.rcsb.org/download/1K4C.pdb'
    },
    {
        id: '1BL8',
        title: 'Aquaporin',
        category: 'Membrane Proteins',
        tags: ['Water Channel', 'Membrane', 'Transport'],
        description: 'Aquaporin-1 water channel, facilitates rapid water transport across membranes.',
        url: 'https://files.rcsb.org/download/1BL8.pdb'
    },
    {
        id: '1F88',
        title: 'Bacteriorhodopsin',
        category: 'Membrane Proteins',
        tags: ['Light-driven', 'Proton Pump', 'Seven Helix'],
        description: 'Light-driven proton pump from halobacteria. Seven transmembrane helix structure.',
        url: 'https://files.rcsb.org/download/1F88.pdb'
    },
    {
        id: '2BG9',
        title: 'G-protein Coupled Receptor',
        category: 'Membrane Proteins',
        tags: ['GPCR', 'Signal Transduction', 'Rhodopsin'],
        description: 'Bovine rhodopsin, prototype for G-protein coupled receptor family.',
        url: 'https://files.rcsb.org/download/2BG9.pdb'
    },

    // Structural Proteins
    {
        id: '1CAG',
        title: 'Collagen',
        category: 'Structural',
        tags: ['Triple Helix', 'Skin', 'Connective', 'Extracellular'],
        description: 'Model of the collagen triple helix structure. Major component of connective tissue.',
        url: 'https://files.rcsb.org/download/1CAG.pdb'
    },
    {
        id: '1A6M',
        title: 'Actin',
        category: 'Structural',
        tags: ['Cytoskeleton', 'Muscle', 'Filament'],
        description: 'Actin filament, major component of cytoskeleton and muscle thin filaments.',
        url: 'https://files.rcsb.org/download/1A6M.pdb'
    },
    {
        id: '1TUB',
        title: 'Tubulin',
        category: 'Structural',
        tags: ['Microtubules', 'Cytoskeleton', 'Cell Division'],
        description: 'Alpha-beta tubulin dimer, building block of microtubules.',
        url: 'https://files.rcsb.org/download/1TUB.pdb'
    },
    {
        id: '2HBB',
        title: 'Keratin',
        category: 'Structural',
        tags: ['Hair', 'Skin', 'Coiled Coil', 'Intermediate Filament'],
        description: 'Alpha-keratin coiled-coil structure, major component of hair and nails.',
        url: 'https://files.rcsb.org/download/2HBB.pdb'
    },

    // Hormones & Signaling
    {
        id: '3PQR',
        title: 'Insulin',
        category: 'Hormones',
        tags: ['Human', 'Medical', 'Hexamer', 'Diabetes'],
        description: 'Human insulin hexamer complexed with zinc. Regulates blood glucose levels.',
        url: 'https://files.rcsb.org/download/3PQR.pdb'
    },
    {
        id: '1GCN',
        title: 'Glucagon',
        category: 'Hormones',
        tags: ['Metabolism', 'Alpha Helix', 'Counter-regulatory'],
        description: 'Glucagon molecule which regulates blood glucose levels, counter to insulin.',
        url: 'https://files.rcsb.org/download/1GCN.pdb'
    },
    {
        id: '1HRP',
        title: 'Growth Hormone',
        category: 'Hormones',
        tags: ['Pituitary', 'Four Helix Bundle', 'Receptor'],
        description: 'Human growth hormone, four-helix bundle structure.',
        url: 'https://files.rcsb.org/download/1HRP.pdb'
    },

    // Viruses
    {
        id: '6VSB',
        title: 'SARS-CoV-2 Spike',
        category: 'Viruses',
        tags: ['Pandemic', 'Viral', 'Glycoprotein', 'Membrane Fusion'],
        description: 'Prefusion 2019-nCoV spike glycoprotein with a single receptor-binding domain up.',
        url: 'https://files.rcsb.org/download/6VSB.pdb'
    },
    {
        id: '2BBK',
        title: 'HIV-1 Protease',
        category: 'Viruses',
        tags: ['Retroviral', 'Drug Target', 'Dimer'],
        description: 'HIV-1 protease, homodimeric aspartyl protease essential for viral maturation.',
        url: 'https://files.rcsb.org/download/2BBK.pdb'
    },
    {
        id: '1A34',
        title: 'Influenza Hemagglutinin',
        category: 'Viruses',
        tags: ['Influenza', 'Membrane Fusion', 'Glycoprotein'],
        description: 'Influenza virus hemagglutinin, mediates viral entry into host cells.',
        url: 'https://files.rcsb.org/download/1A34.pdb'
    },

    // Molecular Machines & Complexes
    {
        id: '5B2I',
        title: 'CRISPR-Cas9',
        category: 'Enzymes',
        tags: ['Gene Editing', 'Large', 'Complex', 'Bacterial Defense'],
        description: 'Crystal structure of Streptococcus pyogenes Cas9 complexed with guide RNA and target DNA.',
        url: 'https://files.rcsb.org/download/5B2I.pdb'
    },
    {
        id: '7DDI',
        title: 'DNA Polymerase',
        category: 'Enzymes',
        tags: ['Replication', 'DNA', 'Complex', 'Fidelity'],
        description: 'DNA Polymerase I from E. coli, shows replication fidelity mechanism.',
        url: 'https://files.rcsb.org/download/7DDI.pdb'
    },
    {
        id: '1GIX',
        title: 'ATP Synthase',
        category: 'Enzymes',
        tags: ['Energy', 'Rotation', 'Mitochondria', 'Motor Protein'],
        description: 'F1-ATPase portion of ATP synthase, rotational motor that synthesizes ATP.',
        url: 'https://files.rcsb.org/download/1GIX.pdb'
    },
    {
        id: '1RYB',
        title: 'Ribosome',
        category: 'Complexes',
        tags: ['Translation', 'Large', 'RNA-Protein', 'Antibiotics'],
        description: 'Bacterial 70S ribosome, the molecular machine for protein synthesis.',
        url: 'https://files.rcsb.org/download/1RYB.pdb'
    },

    // Transport & Storage
    {
        id: '1LMP',
        title: 'Myoglobin',
        category: 'Proteins',
        tags: ['Oxygen Storage', 'Muscle', 'Heme'],
        description: 'Sperm whale myoglobin, oxygen storage in muscle tissues.',
        url: 'https://files.rcsb.org/download/1LMP.pdb'
    },
    {
        id: '1FTP',
        title: 'Ferritin',
        category: 'Proteins',
        tags: ['Iron Storage', 'Spherical', 'Mineralization'],
        description: 'Ferritin, iron storage protein with spherical cage-like structure.',
        url: 'https://files.rcsb.org/download/1FTP.pdb'
    },
    {
        id: '1MSH',
        title: 'Malate Dehydrogenase',
        category: 'Enzymes',
        tags: ['Citric Acid Cycle', 'Oxidoreductase', 'Mitochondrial'],
        description: 'Malate dehydrogenase, key enzyme in citric acid cycle.',
        url: 'https://files.rcsb.org/download/1MSH.pdb'
    },

    // Antibodies & Immune System
    {
        id: '1IGT',
        title: 'Immunoglobulin',
        category: 'Proteins',
        tags: ['Antibody', 'Immune', 'Y-shaped'],
        description: 'Immunoglobulin G Fab fragment, shows antigen-binding site structure.',
        url: 'https://files.rcsb.org/download/1IGT.pdb'
    },
    {
        id: '1TCR',
        title: 'T-cell Receptor',
        category: 'Proteins',
        tags: ['Immune', 'Recognition', 'MHC'],
        description: 'T-cell receptor complex, recognizes antigens presented by MHC molecules.',
        url: 'https://files.rcsb.org/download/1TCR.pdb'
    },

    // Nucleic Acid Binding Proteins
    {
        id: '1LMB',
        title: 'Lac Repressor',
        category: 'Proteins',
        tags: ['Gene Regulation', 'DNA-binding', 'Helix-Turn-Helix'],
        description: 'Lac repressor bound to DNA, classic example of gene regulation.',
        url: 'https://files.rcsb.org/download/1LMB.pdb'
    },
    {
        id: '1YRN',
        title: 'Ribonuclease A',
        category: 'Enzymes',
        tags: ['RNA Degradation', 'Small', 'Historic'],
        description: 'Bovine pancreatic ribonuclease A, early model for protein folding studies.',
        url: 'https://files.rcsb.org/download/1YRN.pdb'
    },
    {
        id: '2DRP',
        title: 'DNA Topoisomerase',
        category: 'Enzymes',
        tags: ['DNA Supercoiling', 'Topology', 'Anticancer Target'],
        description: 'DNA topoisomerase I, regulates DNA supercoiling and topology.',
        url: 'https://files.rcsb.org/download/2DRP.pdb'
    },

    // Metabolic Enzymes
    {
        id: '4COX',
        title: 'Cytochrome c Oxidase',
        category: 'Enzymes',
        tags: ['Respiration', 'Membrane', 'Oxygen Reduction'],
        description: 'Cytochrome c oxidase, terminal enzyme in mitochondrial electron transport chain.',
        url: 'https://files.rcsb.org/download/4COX.pdb'
    },
    {
        id: '1PHK',
        title: 'Phosphofructokinase',
        category: 'Enzymes',
        tags: ['Glycolysis', 'Allosteric', 'Regulation'],
        description: 'Phosphofructokinase, key regulatory enzyme in glycolysis.',
        url: 'https://files.rcsb.org/download/1PHK.pdb'
    },
    {
        id: '8CAT',
        title: 'Catalase',
        category: 'Enzymes',
        tags: ['Antioxidant', 'Heme', 'Hydrogen Peroxide'],
        description: 'Catalase, converts hydrogen peroxide to water and oxygen.',
        url: 'https://files.rcsb.org/download/8CAT.pdb'
    },

    // Chaperones & Folding
    {
        id: '1AON',
        title: 'GroEL',
        category: 'Proteins',
        tags: ['Chaperonin', 'Protein Folding', 'Cylindrical'],
        description: 'GroEL chaperonin, assists protein folding in bacteria.',
        url: 'https://files.rcsb.org/download/1AON.pdb'
    },
    {
        id: '2HSP',
        title: 'Hsp70',
        category: 'Proteins',
        tags: ['Heat Shock', 'Chaperone', 'ATPase'],
        description: 'Hsp70 chaperone, prevents protein aggregation under stress conditions.',
        url: 'https://files.rcsb.org/download/2HSP.pdb'
    },

    // Signal Transduction
    {
        id: '1F3G',
        title: 'Ras',
        category: 'Proteins',
        tags: ['GTPase', 'Oncogene', 'Signal Transduction'],
        description: 'Ras GTPase, important in cell signaling and frequently mutated in cancers.',
        url: 'https://files.rcsb.org/download/1F3G.pdb'
    },
    {
        id: '1CDL',
        title: 'Calmodulin',
        category: 'Proteins',
        tags: ['Calcium Binding', 'EF-hand', 'Signaling'],
        description: 'Calmodulin, calcium-binding messenger protein with EF-hand motifs.',
        url: 'https://files.rcsb.org/download/1CDL.pdb'
    },

    // Carbohydrate-binding
    {
        id: '2CGA',
        title: 'Concanavalin A',
        category: 'Proteins',
        tags: ['Lectin', 'Carbohydrate Binding', 'Plant'],
        description: 'Concanavalin A, plant lectin that binds specific sugar molecules.',
        url: 'https://files.rcsb.org/download/2CGA.pdb'
    },
    {
        id: '1SLT',
        title: 'Lysozyme with substrate',
        category: 'Enzymes',
        tags: ['Enzyme-Substrate', 'Carbohydrate', 'Antibacterial'],
        description: 'Lysozyme complexed with substrate analog, shows catalytic mechanism.',
        url: 'https://files.rcsb.org/download/1SLT.pdb'
    },

    // Additional important structures
    {
        id: '1UBQ',
        title: 'Ubiquitin',
        category: 'Proteins',
        tags: ['Protein Degradation', 'Small', 'Signaling'],
        description: 'Ubiquitin, small regulatory protein that tags proteins for degradation.',
        url: 'https://files.rcsb.org/download/1UBQ.pdb'
    },
    {
        id: '1QHW',
        title: 'p53 Tumor Suppressor',
        category: 'Proteins',
        tags: ['Cancer', 'Transcription Factor', 'DNA-binding'],
        description: 'DNA-binding domain of p53 tumor suppressor protein.',
        url: 'https://files.rcsb.org/download/1QHW.pdb'
    },
    {
        id: '1FAS',
        title: 'Fatty Acid Synthase',
        category: 'Enzymes',
        tags: ['Lipid Synthesis', 'Multifunctional', 'Large Complex'],
        description: 'Mammalian fatty acid synthase, large multifunctional enzyme complex.',
        url: 'https://files.rcsb.org/download/1FAS.pdb'
    }
];