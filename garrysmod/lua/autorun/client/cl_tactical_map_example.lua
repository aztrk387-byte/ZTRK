-- Garry's Mod tactical map HUD example (client-side)
-- Toggle key: F6

if SERVER then return end

local showMap = false
local mapMat = Material("tactical/tactical-map.png", "smooth")

hook.Add("PlayerButtonDown", "GModTacticalMapToggle", function(_, button)
    if button == KEY_F6 then
        showMap = not showMap
        surface.PlaySound("buttons/lightswitch2.wav")
    end
end)

hook.Add("HUDPaint", "GModTacticalMapDraw", function()
    if not showMap then return end

    local sw, sh = ScrW(), ScrH()
    local w, h = math.floor(sw * 0.7), math.floor(sh * 0.7)
    local x, y = math.floor((sw - w) * 0.5), math.floor((sh - h) * 0.5)

    draw.RoundedBox(8, x - 8, y - 8, w + 16, h + 16, Color(8, 12, 20, 230))

    surface.SetDrawColor(255, 255, 255, 255)
    surface.SetMaterial(mapMat)
    surface.DrawTexturedRect(x, y, w, h)

    draw.SimpleText("TACTICAL MAP - F6 to close", "Trebuchet24", x + 12, y + 10, Color(225, 235, 255), TEXT_ALIGN_LEFT, TEXT_ALIGN_TOP)

    local ply = LocalPlayer()
    if IsValid(ply) then
        local px = x + w * 0.5
        local py = y + h * 0.5
        surface.SetDrawColor(255, 80, 80, 230)
        surface.DrawRect(px - 4, py - 4, 8, 8)
        draw.SimpleText(ply:Nick(), "DermaDefaultBold", px + 10, py, Color(255, 255, 255), TEXT_ALIGN_LEFT, TEXT_ALIGN_CENTER)
    end
end)
