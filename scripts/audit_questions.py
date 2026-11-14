import os
import re
import json

files = {
    'nlp': ('Natural Language Processing', 'CS622', 'Answers/NATURAL_LANGUAGE_PROCESSING_PYQ_ANSWERS_AUDITED.md'),
    'system-software': ('System Software', 'IT611', 'Answers/SYSTEM_SOFTWARE_PYQ_ANSWERS.md'),
    'image-processing': ('Digital Image Processing', 'CS633', 'Answers/IMAGE_PROCESSING_PYQ_ANSWERS.md'),
    'entrepreneurship': ('Entrepreneurship', 'IC601', 'Answers/ENTREPRENEURSHIP_PYQ_ANSWERS.md'),
    'computer-networks': ('Computer Networks', 'CS601', 'Answers/COMPUTER_NETWORKS_PYQ_ANSWERS.md'),
    'cloud-computing': ('Cloud Computing', 'CS642', 'Answers/CLOUD_COMPUTING_PYQ_ANSWERS.md')
}

report = {}
grand_total_entries = 0
grand_total_main = 0
grand_total_sub = 0
grand_total_or = 0
grand_total_sn = 0

for sid, (name, code, fpath) in files.items():
    with open(fpath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    if sid == 'nlp':
        year_sections = [('2025', text)]
    else:
        splits = re.split(r'\n(?=#\s+(?:PART\s+[IVXLCDM]+\s*[-–—:]*\s*)?(?:Part\s+[A-Z]\s*[-–—:]*\s*)?(?:[^\n]*?)?(202[0-9]))', text, flags=re.I)
        year_sections = []
        for i in range(1, len(splits), 2):
            yr = splits[i]
            body = splits[i+1] if i+1 < len(splits) else ''
            year_sections.append((yr, body))
            
    report[sid] = {'name': name, 'code': code, 'file': fpath, 'file_size': os.path.getsize(fpath), 'years': {}}
    
    sub_total_entries = 0
    sub_total_main = 0
    sub_total_sub = 0
    sub_total_or = 0
    sub_total_sn = 0
    
    for yr, body in year_sections:
        if sid == 'nlp':
            qs = re.findall(r'^###\s*(Question\s*\d+[\w\(\)\.\:]*.*?)(?=\n|$)', body, re.M | re.I)
        else:
            qs = re.findall(r'^##\s*((?:Question|QX?)\s*\d+[\w\(\)\.\:]*.*?)(?=\n|$)', body, re.M | re.I)
            
        main_q = set()
        sub_q = 0
        or_opt = 0
        short_n = 0
        
        for q in qs:
            m = re.search(r'(?:Question|QX?)\s*(\d+)', q, re.I)
            if m:
                main_q.add(int(m.group(1)))
            if re.search(r'\b(?:OR|Alternative)\b', q, re.I):
                or_opt += 1
            elif re.search(r'\b(?:Short\s*Notes?|Write\s*short\s*notes?)\b', q, re.I):
                short_n += 1
            else:
                sub_q += 1
                
        report[sid]['years'][yr] = {
            'total_entries': len(qs),
            'main_questions': len(main_q),
            'subquestions': sub_q,
            'or_options': or_opt,
            'short_notes': short_n
        }
        sub_total_entries += len(qs)
        sub_total_main += len(main_q)
        sub_total_sub += sub_q
        sub_total_or += or_opt
        sub_total_sn += short_n

    report[sid]['totals'] = {
        'total_entries': sub_total_entries,
        'main_questions': sub_total_main,
        'subquestions': sub_total_sub,
        'or_options': sub_total_or,
        'short_notes': sub_total_sn
    }
    grand_total_entries += sub_total_entries
    grand_total_main += sub_total_main
    grand_total_sub += sub_total_sub
    grand_total_or += sub_total_or
    grand_total_sn += sub_total_sn

print("================================================================================")
print("SEMESTEROS QUESTION INVENTORY AUDIT REPORT")
print("================================================================================")
for sid, data in report.items():
    sname = data['name']
    scode = data['code']
    fsize = data['file_size']
    print(f"\n{sname} ({scode}) - {data['file']} [{fsize:,} bytes]")
    print(f"Years Available: {list(data['years'].keys())}")
    for yr, yd in sorted(data['years'].items(), reverse=True):
        print(f"  {yr}: {yd['total_entries']} entries | {yd['main_questions']} main Qs | {yd['subquestions']} lettered sub-Qs | {yd['or_options']} OR alternatives | {yd['short_notes']} short-note options")
    tot = data['totals']
    print(f"  SUBTOTAL: {tot['total_entries']} entries | {tot['main_questions']} main Qs | {tot['subquestions']} lettered sub-Qs | {tot['or_options']} ORs | {tot['short_notes']} short-notes")

print("\n" + "="*80)
print(f"GRAND TOTALS ACROSS ALL 6 SUBJECTS:")
print(f"  Total Examination Papers: 23 papers")
print(f"  Total Main Question Blocks: {grand_total_main}")
print(f"  Total Lettered Sub-Questions: {grand_total_sub}")
print(f"  Total Internal / OR Alternatives: {grand_total_or}")
print(f"  Total Short-Note Option Groups: {grand_total_sn}")
print(f"  TOTAL DISTINCT ANSWER ENTRIES: {grand_total_entries}")
print("="*80)

# Save to manifest
with open('src/data/manifest.json', 'w', encoding='utf-8') as f:
    json.dump(report, f, indent=2)
print("Saved manifest to src/data/manifest.json")

