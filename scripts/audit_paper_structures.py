import json
import re

with open('src/data/database.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

print("PAPER STRUCTURE AUDIT ACROSS ALL PAPERS:")
for sid, sub in db['subjects'].items():
    sname = sub['name']
    scode = sub['code']
    print(f"\n=== {sname} ({scode}) ===")
    papers = {}
    for q in sub['questions']:
        yr = q['year']
        if yr not in papers:
            papers[yr] = []
        papers[yr].append(q)
    for yr, qs in sorted(papers.items(), reverse=True):
        main_qs = set()
        sub_list = []
        for q in qs:
            m = re.search(r'Q(?:uestion)?\s*(\d+)', q['questionNumber'], re.I)
            if m:
                main_qs.add(int(m.group(1)))
            sub_list.append(q['questionNumber'])
        print(f"  {yr}: {len(qs)} entries | Main Qs: {sorted(list(main_qs))} (Total Main: {len(main_qs)})")
        print(f"     Subquestions: {', '.join(sub_list[:8])}...")

