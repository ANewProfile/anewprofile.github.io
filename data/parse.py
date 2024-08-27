import itertools
import pandas as pd

df = pd.read_csv("raw.csv")
for c in df:
  df[c] = df[c].str.strip()
data = df.to_dict('records')

# headers:
# Tissue
# Cell Type
# Species
# Strain
# Purpose
# Recommended Capsid

def groupby(mlist, key):
  kf = lambda d: d[key]
  mlist = sorted(mlist, key=kf)
  grouped = {k:list(v) for k,v in itertools.groupby(mlist, key=kf)}
  return grouped

print("var capsid_selections = [");

for species, species_groups in groupby(data, "Species").items():
  print(f"  [\"{species}\", [")
      
  for tissue, tissue_groups in groupby(species_groups, "Tissue").items():
    print(f"    [\"{tissue}\", [")

    for cell_type, cell_type_groups in groupby(tissue_groups, "Cell Type").items():
      print(f"      [\"{cell_type}\", [")

      for strain, strain_groups in groupby(cell_type_groups, "Strain").items():
        print(f"        [\"{strain}\", [")

        for data in strain_groups:
          print("          \"%s\"," % data['Recommended Capsid'])

        print(f"          ]],") # end of strain

      print(f"         ]],") # end of cell type

    print(f"        ]],") # end of tissue

  print(f"       ]],") # end of species

print("];")
