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
    },

    // Uncategorized (I'm so lazy to order them)
    {
        id: "1OPD",
        title: "Oxy-myoglobin",
        category: "Proteins",
        tags: ["Oxygen-bound", "Muscle", "Heme", "Ligand Complex"],
        description: "Sperm whale myoglobin with bound oxygen, showing how oxygen binds to heme iron.",
        url: "https://files.rcsb.org/download/1OPD.pdb"
    },
    {
        id: "1QPI",
        title: "Cytochrome c",
        category: "Proteins",
        tags: ["Electron Transport", "Mitochondrial", "Heme", "Evolutionary"],
        description: "Mitochondrial cytochrome c, involved in electron transport chain and apoptosis.",
        url: "https://files.rcsb.org/download/1QPI.pdb"
    },
    {
        id: "1MBO",
        title: "Myoglobin Mutant",
        category: "Proteins",
        tags: ["Mutant", "Heme", "Protein Engineering"],
        description: "Site-directed mutant of myoglobin, used in protein engineering studies.",
        url: "https://files.rcsb.org/download/1MBO.pdb"
    },
    {
        id: "2POR",
        title: "Porin",
        category: "Membrane Proteins",
        tags: ["Beta Barrel", "Outer Membrane", "Bacterial", "Transport"],
        description: "Bacterial porin from Rhodobacter capsulatus, beta-barrel membrane protein.",
        url: "https://files.rcsb.org/download/2POR.pdb"
    },
    {
        id: "1PRC",
        title: "C-phycocyanin",
        category: "Proteins",
        tags: ["Photosynthetic", "Algal", "Light-harvesting", "Bilin"],
        description: "Light-harvesting phycobiliprotein from cyanobacteria, contains bilin chromophores.",
        url: "https://files.rcsb.org/download/1PRC.pdb"
    },
    {
        id: "1BVP",
        title: "Bacteriochlorophyll Protein",
        category: "Proteins",
        tags: ["Photosynthetic", "Bacterial", "Chlorophyll", "Antenna"],
        description: "Bacteriochlorophyll a-protein from green sulfur bacteria, light-harvesting complex.",
        url: "https://files.rcsb.org/download/1BVP.pdb"
    },
    {
        id: "1RCF",
        title: "Reaction Center",
        category: "Membrane Proteins",
        tags: ["Photosynthetic", "Membrane", "Electron Transfer", "Bacterial"],
        description: "Photosynthetic reaction center from Rhodobacter sphaeroides.",
        url: "https://files.rcsb.org/download/1RCF.pdb"
    },
    {
        id: "1PS1",
        title: "Photosystem I",
        category: "Membrane Proteins",
        tags: ["Photosynthetic", "Plant", "Membrane Complex", "Chlorophyll"],
        description: "Photosystem I from pea plants, large membrane protein complex.",
        url: "https://files.rcsb.org/download/1PS1.pdb"
    },
    {
        id: "1JB0",
        title: "Photosystem II",
        category: "Membrane Proteins",
        tags: ["Oxygen Evolving", "Manganese Cluster", "Photosynthetic"],
        description: "Photosystem II from thermophilic cyanobacteria, contains oxygen-evolving complex.",
        url: "https://files.rcsb.org/download/1JB0.pdb"
    },
    {
        id: "1D66",
        title: "DNA Helicase",
        category: "Enzymes",
        tags: ["DNA Unwinding", "ATPase", "Replication", "Motor Protein"],
        description: "Bacteriophage T7 DNA helicase, unwinds DNA double helix during replication.",
        url: "https://files.rcsb.org/download/1D66.pdb"
    },
    {
        id: "1QRS",
        title: "QR1",
        category: "Enzymes",
        tags: ["Quinone", "Oxidoreductase", "Metabolic"],
        description: "Quinone oxidoreductase, involved in detoxification and metabolic processes.",
        url: "https://files.rcsb.org/download/1QRS.pdb"
    },
    {
        id: "1DXG",
        title: "Xylanase",
        category: "Enzymes",
        tags: ["Carbohydrate", "Hydrolase", "Plant Cell Wall"],
        description: "Endo-1,4-beta-xylanase, breaks down xylan in plant cell walls.",
        url: "https://files.rcsb.org/download/1DXG.pdb"
    },
    {
        id: "1HWG",
        title: "HIV-1 Reverse Transcriptase",
        category: "Enzymes",
        tags: ["Retroviral", "RNA-dependent DNA polymerase", "Drug Target"],
        description: "HIV-1 reverse transcriptase complexed with DNA and inhibitor.",
        url: "https://files.rcsb.org/download/1HWG.pdb"
    },
    {
        id: "1ESY",
        title: "Elastase",
        category: "Enzymes",
        tags: ["Serine Protease", "Connective Tissue", "Digestive"],
        description: "Pancreatic elastase, breaks down elastin in connective tissue.",
        url: "https://files.rcsb.org/download/1ESY.pdb"
    },
    {
        id: "1SGT",
        title: "Serine Hydroxymethyltransferase",
        category: "Enzymes",
        tags: ["One-carbon Metabolism", "Pyridoxal Phosphate", "Amino Acid"],
        description: "Serine hydroxymethyltransferase, pyridoxal phosphate-dependent enzyme.",
        url: "https://files.rcsb.org/download/1SGT.pdb"
    },
    {
        id: "1B8E",
        title: "Beta-lactamase",
        category: "Enzymes",
        tags: ["Antibiotic Resistance", "Bacterial", "Drug Target"],
        description: "TEM-1 beta-lactamase, confers resistance to penicillin antibiotics.",
        url: "https://files.rcsb.org/download/1B8E.pdb"
    },
    {
        id: "1NBT",
        title: "Nitrogenase",
        category: "Enzymes",
        tags: ["Nitrogen Fixation", "Iron-Molybdenum", "Bacterial"],
        description: "Nitrogenase MoFe protein, converts atmospheric nitrogen to ammonia.",
        url: "https://files.rcsb.org/download/1NBT.pdb"
    },
    {
        id: "7AHL",
        title: "Alcohol Dehydrogenase",
        category: "Enzymes",
        tags: ["Zinc-dependent", "Oxidoreductase", "Ethanol Metabolism"],
        description: "Horse liver alcohol dehydrogenase, zinc-containing enzyme.",
        url: "https://files.rcsb.org/download/7AHL.pdb"
    },
    {
        id: "1LDM",
        title: "Lactate Dehydrogenase",
        category: "Enzymes",
        tags: ["Glycolysis", "Oxidoreductase", "NAD-binding"],
        description: "Dogfish M4 lactate dehydrogenase, important in anaerobic metabolism.",
        url: "https://files.rcsb.org/download/1LDM.pdb"
    },
    {
        id: "1GD1",
        title: "Glyceraldehyde-3-phosphate Dehydrogenase",
        category: "Enzymes",
        tags: ["Glycolysis", "Oxidoreductase", "Key Metabolic"],
        description: "GAPDH from Bacillus stearothermophilus, key glycolytic enzyme.",
        url: "https://files.rcsb.org/download/1GD1.pdb"
    },
    {
        id: "1PYP",
        title: "Pyrophosphatase",
        category: "Enzymes",
        tags: ["Inorganic", "Hydrolysis", "Metabolic"],
        description: "Inorganic pyrophosphatase, hydrolyzes pyrophosphate to phosphate.",
        url: "https://files.rcsb.org/download/1PYP.pdb"
    },
    {
        id: "1KPB",
        title: "Kinesin",
        category: "Proteins",
        tags: ["Motor Protein", "Microtubule", "ATPase", "Intracellular Transport"],
        description: "Kinesin motor domain, walks along microtubules transporting cargo.",
        url: "https://files.rcsb.org/download/1KPB.pdb"
    },
    {
        id: "1WDC",
        title: "Dynein",
        category: "Proteins",
        tags: ["Motor Protein", "Microtubule", "AAA+ ATPase"],
        description: "Cytoplasmic dynein motor domain, minus-end directed microtubule motor.",
        url: "https://files.rcsb.org/download/1WDC.pdb"
    },
    {
        id: "1F4W",
        title: "Fibrinogen",
        category: "Proteins",
        tags: ["Blood Clotting", "Coiled-coil", "Circulatory"],
        description: "Human fibrinogen, essential for blood clot formation.",
        url: "https://files.rcsb.org/download/1F4W.pdb"
    },
    {
        id: "1CVU",
        title: "Cysteine Protease Inhibitor",
        category: "Proteins",
        tags: ["Protease Inhibitor", "Cystatin", "Regulatory"],
        description: "Cystatin, inhibitor of cysteine proteases like papain.",
        url: "https://files.rcsb.org/download/1CVU.pdb"
    },
    {
        id: "1THB",
        title: "Thioredoxin",
        category: "Proteins",
        tags: ["Redox", "Small", "Disulfide Reductase"],
        description: "E. coli thioredoxin, small redox protein with CXXC active site.",
        url: "https://files.rcsb.org/download/1THB.pdb"
    },
    {
        id: "1GTR",
        title: "Glutathione Reductase",
        category: "Enzymes",
        tags: ["Redox", "NADPH", "Antioxidant"],
        description: "Human glutathione reductase, maintains glutathione in reduced state.",
        url: "https://files.rcsb.org/download/1GTR.pdb"
    },
    {
        id: "1F1C",
        title: "Ferredoxin",
        category: "Proteins",
        tags: ["Iron-Sulfur", "Electron Transfer", "Small"],
        description: "Plant-type ferredoxin, [2Fe-2S] iron-sulfur electron transfer protein.",
        url: "https://files.rcsb.org/download/1F1C.pdb"
    },
    {
        id: "1CPQ",
        title: "Copper, Zinc Superoxide Dismutase",
        category: "Enzymes",
        tags: ["Antioxidant", "Metalloenzyme", "Superoxide"],
        description: "Cu,Zn superoxide dismutase, converts superoxide to hydrogen peroxide.",
        url: "https://files.rcsb.org/download/1CPQ.pdb"
    },
    {
        id: "1JFB",
        title: "Iron Superoxide Dismutase",
        category: "Enzymes",
        tags: ["Antioxidant", "Iron", "Bacterial"],
        description: "Fe superoxide dismutase from E. coli, bacterial antioxidant enzyme.",
        url: "https://files.rcsb.org/download/1JFB.pdb"
    },
    {
        id: "1ARB",
        title: "Adenylate Kinase",
        category: "Enzymes",
        tags: ["Nucleotide", "Phosphotransferase", "Energy Metabolism"],
        description: "Adenylate kinase, interconverts ATP, ADP and AMP.",
        url: "https://files.rcsb.org/download/1ARB.pdb"
    },
    {
        id: "1KSD",
        title: "Adenylate Kinase with substrate",
        category: "Enzymes",
        tags: ["Enzyme-Substrate", "Nucleotide", "Conformational Change"],
        description: "Adenylate kinase complexed with substrate analogs.",
        url: "https://files.rcsb.org/download/1KSD.pdb"
    },
    {
        id: "1PGA",
        title: "Phosphoglycerate Kinase",
        category: "Enzymes",
        tags: ["Glycolysis", "ATP-generating", "Two-domain"],
        description: "Phosphoglycerate kinase, ATP-generating step in glycolysis.",
        url: "https://files.rcsb.org/download/1PGA.pdb"
    },
    {
        id: "1YPI",
        title: "Triose Phosphate Isomerase with inhibitor",
        category: "Enzymes",
        tags: ["TIM Barrel", "Glycolysis", "Transition State Analog"],
        description: "Triose phosphate isomerase complexed with transition state analog.",
        url: "https://files.rcsb.org/download/1YPI.pdb"
    },
    {
        id: "1HNE",
        title: "Neuraminidase",
        category: "Enzymes",
        tags: ["Influenza", "Viral", "Glycosidase", "Drug Target"],
        description: "Influenza virus neuraminidase, target of antiviral drugs like oseltamivir.",
        url: "https://files.rcsb.org/download/1HNE.pdb"
    },
    {
        id: "1AAY",
        title: "Alpha-amylase Inhibitor",
        category: "Proteins",
        tags: ["Enzyme Inhibitor", "Plant", "Carbohydrate"],
        description: "Alpha-amylase inhibitor from bean, inhibits mammalian alpha-amylases.",
        url: "https://files.rcsb.org/download/1AAY.pdb"
    },
    {
        id: "1TIE",
        title: "Trypsin Inhibitor",
        category: "Proteins",
        tags: ["Protease Inhibitor", "Small", "Standard"],
        description: "Bovine pancreatic trypsin inhibitor, standard for protein folding studies.",
        url: "https://files.rcsb.org/download/1TIE.pdb"
    },
    {
        id: "1PPF",
        title: "Peptidyl-prolyl Isomerase",
        category: "Enzymes",
        tags: ["Protein Folding", "Isomerase", "Chaperone"],
        description: "Cyclophilin A, peptidyl-prolyl cis-trans isomerase and drug target.",
        url: "https://files.rcsb.org/download/1PPF.pdb"
    },
    {
        id: "1FKB",
        title: "FK506-binding Protein",
        category: "Proteins",
        tags: ["Immunophilin", "Drug Binding", "Isomerase"],
        description: "FKBP12, binds immunosuppressive drugs FK506 and rapamycin.",
        url: "https://files.rcsb.org/download/1FKB.pdb"
    },
    {
        id: "1SRL",
        title: "Seryl-tRNA Synthetase",
        category: "Enzymes",
        tags: ["Aminoacyl-tRNA", "Translation", "ATP-dependent"],
        description: "Seryl-tRNA synthetase, charges tRNA with serine amino acid.",
        url: "https://files.rcsb.org/download/1SRL.pdb"
    },
    {
        id: "1ASY",
        title: "Aspartyl-tRNA Synthetase",
        category: "Enzymes",
        tags: ["Aminoacyl-tRNA", "Class II", "Translation"],
        description: "Aspartyl-tRNA synthetase complexed with tRNA, class II synthetase.",
        url: "https://files.rcsb.org/download/1ASY.pdb"
    },
    {
        id: "1QF6",
        title: "Queuine tRNA-ribosyltransferase",
        category: "Enzymes",
        tags: ["tRNA Modification", "Base Exchange", "Bacterial"],
        description: "tRNA-guanine transglycosylase, modifies tRNA with queuine base.",
        url: "https://files.rcsb.org/download/1QF6.pdb"
    },
    {
        id: "1DIZ",
        title: "Dihydrofolate Reductase",
        category: "Enzymes",
        tags: ["Folate Metabolism", "Drug Target", "Anticancer"],
        description: "Human dihydrofolate reductase, target of methotrexate and trimethoprim.",
        url: "https://files.rcsb.org/download/1DIZ.pdb"
    },
    {
        id: "1J3A",
        title: "Thymidylate Synthase",
        category: "Enzymes",
        tags: ["Nucleotide Synthesis", "Anticancer Target", "Methyltransferase"],
        description: "Thymidylate synthase, synthesizes thymidine monophosphate.",
        url: "https://files.rcsb.org/download/1J3A.pdb"
    },
    {
        id: "1GSO",
        title: "Glutamine Synthetase",
        category: "Enzymes",
        tags: ["Amino Acid", "Nitrogen Metabolism", "Dodecamer"],
        description: "Glutamine synthetase, synthesizes glutamine from glutamate and ammonia.",
        url: "https://files.rcsb.org/download/1GSO.pdb"
    },
    {
        id: "1B8V",
        title: "Carbonic Anhydrase",
        category: "Enzymes",
        tags: ["Zinc", "CO2 Hydration", "Rapid Catalysis"],
        description: "Human carbonic anhydrase II, extremely efficient zinc metalloenzyme.",
        url: "https://files.rcsb.org/download/1B8V.pdb"
    },
    {
        id: "1XFK",
        title: "Carboxypeptidase A",
        category: "Enzymes",
        tags: ["Zinc", "Protease", "Exopeptidase"],
        description: "Bovine carboxypeptidase A, zinc-dependent exopeptidase.",
        url: "https://files.rcsb.org/download/1XFK.pdb"
    },
    {
        id: "1PNE",
        title: "Penicillopepsin",
        category: "Enzymes",
        tags: ["Aspartic Protease", "Fungal", "Inhibitor Complex"],
        description: "Penicillopepsin from Penicillium janthinellum, aspartic protease.",
        url: "https://files.rcsb.org/download/1PNE.pdb"
    },
    {
        id: "1TON",
        title: "Subtilisin",
        category: "Enzymes",
        tags: ["Serine Protease", "Bacterial", "Industrial"],
        description: "Subtilisin Carlsberg, bacterial serine protease used in detergents.",
        url: "https://files.rcsb.org/download/1TON.pdb"
    },
    {
        id: "1SGT",
        title: "Beta-glucanase",
        category: "Enzymes",
        tags: ["Carbohydrate", "Hydrolase", "Plant Cell Wall"],
        description: "Beta-1,3-1,4-glucanase, breaks down mixed linkage glucans.",
        url: "https://files.rcsb.org/download/1SGT.pdb"
    },
    {
        id: "1CLB",
        title: "Cellulase",
        category: "Enzymes",
        tags: ["Carbohydrate", "Hydrolase", "Plant Cell Wall"],
        description: "Cellulase from Trichoderma reesei, breaks down cellulose.",
        url: "https://files.rcsb.org/download/1CLB.pdb"
    },
    {
        id: "1AM1",
        title: "Amylomaltase",
        category: "Enzymes",
        tags: ["Carbohydrate", "Transferase", "Glycogen Metabolism"],
        description: "Amylomaltase, transfers glucose units in starch metabolism.",
        url: "https://files.rcsb.org/download/1AM1.pdb"
    },
    {
        id: "1BXW",
        title: "Xylose Isomerase",
        category: "Enzymes",
        tags: ["Carbohydrate", "Isomerase", "Industrial"],
        description: "Glucose/xylose isomerase, converts glucose to fructose industrially.",
        url: "https://files.rcsb.org/download/1BXW.pdb"
    },
    {
        id: "1RHD",
        title: "Rhodanese",
        category: "Enzymes",
        tags: ["Sulfur Transfer", "Two-domain", "Detoxification"],
        description: "Rhodanese, transfers sulfur from thiosulfate to cyanide.",
        url: "https://files.rcsb.org/download/1RHD.pdb"
    },
    {
        id: "1G40",
        title: "Glutathione S-transferase",
        category: "Enzymes",
        tags: ["Detoxification", "Xenobiotic", "Conjugation"],
        description: "Glutathione S-transferase, conjugates glutathione to xenobiotics.",
        url: "https://files.rcsb.org/download/1G40.pdb"
    },
    {
        id: "1A27",
        title: "Aconitase",
        category: "Enzymes",
        tags: ["Citric Acid Cycle", "Iron-Sulfur", "Isomerase"],
        description: "Aconitase, converts citrate to isocitrate in citric acid cycle.",
        url: "https://files.rcsb.org/download/1A27.pdb"
    },
    {
        id: "1FUM",
        title: "Fumarase",
        category: "Enzymes",
        tags: ["Citric Acid Cycle", "Hydratase", "Tetramer"],
        description: "Fumarase, hydrates fumarate to malate in citric acid cycle.",
        url: "https://files.rcsb.org/download/1FUM.pdb"
    },
    {
        id: "1SDH",
        title: "Succinate Dehydrogenase",
        category: "Enzymes",
        tags: ["Citric Acid Cycle", "Membrane", "Electron Transport"],
        description: "Succinate dehydrogenase, complex II of electron transport chain.",
        url: "https://files.rcsb.org/download/1SDH.pdb"
    },
    {
        id: "1ICT",
        title: "Isocitrate Dehydrogenase",
        category: "Enzymes",
        tags: ["Citric Acid Cycle", "NADP-dependent", "Allosteric"],
        description: "Isocitrate dehydrogenase, key regulatory enzyme in citric acid cycle.",
        url: "https://files.rcsb.org/download/1ICT.pdb"
    },
    {
        id: "1LTS",
        title: "Dihydrolipoyl Transacetylase",
        category: "Enzymes",
        tags: ["Pyruvate Dehydrogenase", "Multienzyme Complex", "Lipoyl Domain"],
        description: "E2 component of pyruvate dehydrogenase complex.",
        url: "https://files.rcsb.org/download/1LTS.pdb"
    },
    {
        id: "1B0S",
        title: "Biotin Carboxylase",
        category: "Enzymes",
        tags: ["Acetyl-CoA Carboxylase", "ATP-dependent", "Biotin"],
        description: "Biotin carboxylase component of acetyl-CoA carboxylase.",
        url: "https://files.rcsb.org/download/1B0S.pdb"
    },
    {
        id: "1MKA",
        title: "Mevalonate Kinase",
        category: "Enzymes",
        tags: ["Isoprenoid", "Kinase", "Metabolic"],
        description: "Mevalonate kinase, first committed step in isoprenoid biosynthesis.",
        url: "https://files.rcsb.org/download/1MKA.pdb"
    },
    {
        id: "1DQW",
        title: "Dehydroquinate Synthase",
        category: "Enzymes",
        tags: ["Shikimate", "Metabolic", "Plant"],
        description: "Dehydroquinate synthase, early step in shikimate pathway.",
        url: "https://files.rcsb.org/download/1DQW.pdb"
    },
    {
        id: "1PII",
        title: "Inorganic Pyrophosphatase",
        category: "Enzymes",
        tags: ["Pyrophosphate", "Hydrolysis", "Essential"],
        description: "Inorganic pyrophosphatase, essential for many biosynthetic reactions.",
        url: "https://files.rcsb.org/download/1PII.pdb"
    },
    {
        id: "1F8Z",
        title: "Fructose-1,6-bisphosphatase",
        category: "Enzymes",
        tags: ["Gluconeogenesis", "Allosteric", "Tetramer"],
        description: "Fructose-1,6-bisphosphatase, key gluconeogenic enzyme.",
        url: "https://files.rcsb.org/download/1F8Z.pdb"
    },
    {
        id: "1G3P",
        title: "Glycerol-3-phosphate Dehydrogenase",
        category: "Enzymes",
        tags: ["Glycerol", "Oxidoreductase", "NAD-binding"],
        description: "Glycerol-3-phosphate dehydrogenase, connects glycolysis and lipid metabolism.",
        url: "https://files.rcsb.org/download/1G3P.pdb"
    },
    {
        id: "1H2A",
        title: "Histone H2A",
        category: "Proteins",
        tags: ["Nucleosome", "DNA Packaging", "Chromatin"],
        description: "Core histone H2A, component of nucleosome core particle.",
        url: "https://files.rcsb.org/download/1H2A.pdb"
    },
    {
        id: "1HIO",
        title: "Histone H4",
        category: "Proteins",
        tags: ["Nucleosome", "DNA Packaging", "Chromatin"],
        description: "Core histone H4, highly conserved component of nucleosome.",
        url: "https://files.rcsb.org/download/1HIO.pdb"
    },
    {
        id: "1EQZ",
        title: "Nucleosome Core Particle",
        category: "Complexes",
        tags: ["Chromatin", "Histone", "DNA Packaging"],
        description: "Nucleosome core particle, fundamental unit of chromatin.",
        url: "https://files.rcsb.org/download/1EQZ.pdb"
    },
    {
        id: "1VA4",
        title: "Vitamin D Receptor",
        category: "Proteins",
        tags: ["Nuclear Receptor", "Transcription", "Hormone"],
        description: "Vitamin D receptor DNA-binding domain, nuclear receptor family.",
        url: "https://files.rcsb.org/download/1VA4.pdb"
    },
    {
        id: "1HCQ",
        title: "HMG-CoA Reductase",
        category: "Enzymes",
        tags: ["Cholesterol", "Membrane", "Drug Target"],
        description: "HMG-CoA reductase, rate-limiting enzyme in cholesterol biosynthesis.",
        url: "https://files.rcsb.org/download/1HCQ.pdb"
    },
    {
        id: "1LW6",
        title: "Low-density Lipoprotein Receptor",
        category: "Proteins",
        tags: ["Cholesterol", "Membrane", "Receptor"],
        description: "LDL receptor ligand-binding domain, mediates cholesterol uptake.",
        url: "https://files.rcsb.org/download/1LW6.pdb"
    },
    {
        id: "1A1M",
        title: "Annexin",
        category: "Proteins",
        tags: ["Calcium", "Membrane", "Phospholipid"],
        description: "Annexin V, calcium-dependent phospholipid-binding protein.",
        url: "https://files.rcsb.org/download/1A1M.pdb"
    },
    {
        id: "1CYO",
        title: "Cytochrome b562",
        category: "Proteins",
        tags: ["Heme", "Electron Transport", "Four-helix Bundle"],
        description: "E. coli cytochrome b562, four-helix bundle heme protein.",
        url: "https://files.rcsb.org/download/1CYO.pdb"
    },
    {
        id: "1CCR",
        title: "Cytochrome c Reductase",
        category: "Enzymes",
        tags: ["Respiratory Chain", "Membrane", "Complex III"],
        description: "Cytochrome bc1 complex, complex III of respiratory chain.",
        url: "https://files.rcsb.org/download/1CCR.pdb"
    },
    {
        id: "1OCC",
        title: "Cytochrome c Oxidase",
        category: "Enzymes",
        tags: ["Respiratory Chain", "Membrane", "Complex IV"],
        description: "Cytochrome c oxidase, complex IV of mitochondrial respiratory chain.",
        url: "https://files.rcsb.org/download/1OCC.pdb"
    },
    {
        id: "1Q16",
        title: "Quinol-fumarate Reductase",
        category: "Enzymes",
        tags: ["Respiratory", "Membrane", "Anaerobic"],
        description: "Quinol-fumarate reductase from anaerobic bacteria.",
        url: "https://files.rcsb.org/download/1Q16.pdb"
    },
    {
        id: "1DXT",
        title: "Dextranase",
        category: "Enzymes",
        tags: ["Carbohydrate", "Hydrolase", "Dental"],
        description: "Dextranase, breaks down dextran polymers.",
        url: "https://files.rcsb.org/download/1DXT.pdb"
    },
    {
        id: "1HP1",
        title: "Heparinase",
        category: "Enzymes",
        tags: ["Carbohydrate", "Lyase", "Glycosaminoglycan"],
        description: "Heparinase I, cleaves heparin and heparan sulfate.",
        url: "https://files.rcsb.org/download/1HP1.pdb"
    },
    {
        id: "1HYA",
        title: "Hyaluronidase",
        category: "Enzymes",
        tags: ["Carbohydrate", "Hydrolase", "Connective Tissue"],
        description: "Hyaluronidase, breaks down hyaluronic acid in connective tissue.",
        url: "https://files.rcsb.org/download/1HYA.pdb"
    },
    {
        id: "1K9V",
        title: "Keratanase",
        category: "Enzymes",
        tags: ["Carbohydrate", "Hydrolase", "Glycosaminoglycan"],
        description: "Keratanase, cleaves keratan sulfate glycosaminoglycan.",
        url: "https://files.rcsb.org/download/1K9V.pdb"
    },
    {
        id: "1NOP",
        title: "Nitric Oxide Synthase",
        category: "Enzymes",
        tags: ["Signaling", "Heme", "Flavoprotein"],
        description: "Nitric oxide synthase oxygenase domain, produces NO signaling molecule.",
        url: "https://files.rcsb.org/download/1NOP.pdb"
    },
    {
        id: "1F20",
        title: "Fatty Acid Binding Protein",
        category: "Proteins",
        tags: ["Lipid", "Transport", "Beta Barrel"],
        description: "Fatty acid binding protein, intracellular fatty acid transporter.",
        url: "https://files.rcsb.org/download/1F20.pdb"
    },
    {
        id: "1PMC",
        title: "Phospholipase C",
        category: "Enzymes",
        tags: ["Signaling", "Membrane", "Calcium"],
        description: "Phospholipase C, generates second messengers in signaling.",
        url: "https://files.rcsb.org/download/1PMC.pdb"
    },
    {
        id: "1POC",
        title: "Phospholipase A2",
        category: "Enzymes",
        tags: ["Lipid", "Membrane", "Calcium"],
        description: "Phospholipase A2, releases fatty acids from phospholipids.",
        url: "https://files.rcsb.org/download/1POC.pdb"
    },
    {
        id: "1MAI",
        title: "Malate Synthase",
        category: "Enzymes",
        tags: ["Glyoxylate", "Metabolic", "Large"],
        description: "Malate synthase, key enzyme in glyoxylate cycle.",
        url: "https://files.rcsb.org/download/1MAI.pdb"
    },
    {
        id: "1ISU",
        title: "Isopenicillin N Synthase",
        category: "Enzymes",
        tags: ["Antibiotic", "Iron", "Oxidase"],
        description: "Isopenicillin N synthase, non-heme iron oxidase in penicillin biosynthesis.",
        url: "https://files.rcsb.org/download/1ISU.pdb"
    },
    {
        id: "1D7T",
        title: "Deacetoxycephalosporin C Synthase",
        category: "Enzymes",
        tags: ["Antibiotic", "Iron", "Oxidase"],
        description: "Deacetoxycephalosporin C synthase, expands penicillin to cephalosporin.",
        url: "https://files.rcsb.org/download/1D7T.pdb"
    },
    {
        id: "1B56",
        title: "Beta-lactam Synthetase",
        category: "Enzymes",
        tags: ["Antibiotic", "ATP-grasp", "Biosynthesis"],
        description: "Beta-lactam synthetase, forms beta-lactam ring in antibiotics.",
        url: "https://files.rcsb.org/download/1B56.pdb"
    }
];