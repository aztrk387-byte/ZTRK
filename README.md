# Garry's Mod Tactical Map (GMod)

Bu repo artık doğrudan **Garry's Mod** için tactical map kullanımı hedefler.

## İçerik
- `assets/tactical-map.svg` → Düzenlenebilir kaynak harita (vektör)
- `garrysmod/lua/autorun/client/cl_tactical_map_example.lua` → GMod HUD üzerinde map gösterimi için örnek client-side script

## Garry's Mod'da kullanım
1. `assets/tactical-map.svg` dosyasını düzenleyin (bölge adları, oklar, rota vb.).
2. SVG'yi PNG olarak dışa aktarın (ör: `tactical-map.png`).
3. PNG dosyasını addon içine koyun:
   - `garrysmod/materials/tactical/tactical-map.png`
4. Örnek Lua dosyasını addon içine ekleyin:
   - `garrysmod/lua/autorun/client/cl_tactical_map_example.lua`
5. Oyuna girin, `F6` ile tactical map aç/kapat.

## Notlar
- Script sadece örnektir; takım/rol bazlı görünürlük, marker sistemi, net mesajlar vb. ile genişletebilirsiniz.
- Texture yolu script içinde `Material("tactical/tactical-map.png", "smooth")` olarak kullanılır.
