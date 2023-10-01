export const sort = (value: string[] | null) => {
    return (value || []).sort((a, b) =>  (tileMap.get(a) || 0) - (tileMap.get(b) || 0))
  }
  
export const isValid = (value: string | null) => {
    const valueList: string[] = (value || '').split(",").map((item) => item.trim()) || [];
    return valueList.every(item => tileMap.has(item))
  }
  
export const tileMap: Map<string, number> = new Map<string, number>([
    ['1p', 1 ],
    ['2p', 2 ],
    ['3p', 3 ],
    ['4p', 4 ],
    ['5p', 5 ],
    ['6p', 6 ],
    ['7p', 7 ],
    ['8p', 8 ],
    ['9p', 9 ],
    ['1s', 10 ],
    ['2s', 11 ],
    ['3s', 12 ],
    ['4s', 13 ],
    ['5s', 14 ],
    ['6s', 15 ],
    ['7s', 16 ],
    ['8s', 17 ],
    ['9s', 18 ],
    ['1m', 19 ],
    ['2m', 20 ],
    ['3m', 21 ],
    ['4m', 22 ],
    ['5m', 23 ],
    ['6m', 24 ],
    ['7m', 25 ],
    ['8m', 26 ],
    ['9m', 27 ],
    ['1z', 28 ],
    ['2z', 29 ],
    ['3z', 30 ],
    ['4z', 31 ],
    ['5z', 32 ],
    ['6z', 33 ],
    ['7z', 34 ],
  ])