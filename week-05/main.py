from view import *
from model import *
from PIL import ImageTk, Image
from random import *
from time import *
from _thread import *


draw_map()
hero = Hero()
hero.image = ImageTk.PhotoImage(Image.open("hero-down.png"))
draw_hero(0,0, hero.image)

map_source = open("map.txt")
map_tiles = map_source.readlines()


monster_on_map = 0
monsters_ready = []
while monster_on_map < 5:
    monster = Monster()
    if map_tiles[monster.y//72][monster.x//72] != '0' or monster in monsters_ready:
        continue
    else:
        monster.image = ImageTk.PhotoImage(Image.open("skeleton.png"))
        draw_monster(monster.x, monster.y, monster.image)
        monsters_ready.append(monster)
        monster_on_map += 1
        
boss = Boss()
boss_on_map = 0
while boss_on_map < 1:
    if map_tiles[boss.y//72][boss.x//72] != '0' or boss in monsters_ready:
        boss = Boss()
    else:
        boss.image = ImageTk.PhotoImage(Image.open("boss.png"))
        draw_boss(boss.x, boss.y, boss.image)
        boss_on_map = 1


class Controller():
    def on_key_press(self, e):
        if e.keycode == 40 :
            hero.image = ImageTk.PhotoImage(Image.open("hero-down.png"))
            if hero.y + 72 <= 720 and map_tiles[(hero.y + 72)//72][hero.x//72] == '0':
                hero.y = hero.y + 72
        elif e.keycode == 38:
            hero.image = ImageTk.PhotoImage(Image.open("hero-up.png"))
            if hero.y - 72 >= 0 and map_tiles[(hero.y - 72)//72][hero.x//72] == '0':
                hero.y = hero.y - 72
        elif e.keycode == 37:
            hero.image = ImageTk.PhotoImage(Image.open("hero-left.png"))
            if hero.x - 72 >= 0 and map_tiles[hero.y//72][(hero.x - 72)//72] == '0':
                hero.x = hero.x - 72
        elif e.keycode == 39:
            hero.image = ImageTk.PhotoImage(Image.open("hero-right.png"))
            if hero.x + 72 < 720 and map_tiles[hero.y//72][(hero.x + 72)//72] == '0':
                hero.x = hero.x + 72
        draw_hero(hero.x, hero.y, hero.image)
        
def monster_move(threadName, delay):
    while True:
        for i in range(len(monsters_ready)):
            random_index = randint(0,4)
            if random_index == 0:
                if monster.y + 72 <= 720 and map_tiles[(monster.y + 72)//72][monster.x//72] == '0':
                    monster.y = monster.y + 72
                    sleep(delay)
            elif random_index == 1:
                if monster.y - 72 >= 0 and map_tiles[(monster.y - 72)//72][monster.x//72] == '0':
                    monster.y = monster.y - 72
                    sleep(delay)
            elif random_index == 2:
                if monster.x - 72 >= 0 and map_tiles[monster.y//72][(monster.x - 72)//72] == '0':
                    monster.x = monster.x - 72
                    sleep(delay)
            elif random_index == 3:
                if monster.x + 72 < 720 and map_tiles[monster.y//72][(monster.x + 72)//72] == '0':
                    monster.x = monster.x + 72
                    sleep(delay)
            draw_monster(monster.x, monster.y, monster.image)
            if i == len(monsters_ready):
                i = 0
            else:
                i += 1
start_new_thread(monster_move, ("thread-2", 1))
canvas.bind("<KeyPress>", Controller().on_key_press)
canvas.pack()
canvas.focus_set()
root.mainloop()
#print(map_tiles)