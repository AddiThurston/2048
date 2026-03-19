import numpy as np
import os
import random

def display():
    # Check the operating system name
    if os.name == 'nt':
        # Command for Windows
        _ = os.system('cls')
    else:
        # Command for macOS and Linux (posix systems)
        _ = os.system('clear')
    global grid
    for i in range(4):
        for j in range(4):
            print(grid[i][j], end=" ")
        print()

def up():
    global grid
    for y in range(1,4):
        for x in range(0,4):
            val = grid[y][x] 
            if val != 0:
                i = y-1
                while i > 0 and grid[i][x] == 0:
                    i -= 1
                if grid[i][x] == val:
                    grid[y][x] = 0
                    grid[i][x] += val
                elif grid[i][x] == 0:
                    grid[y][x] = 0
                    grid[i][x] = val
                else:
                    grid[y][x] = 0
                    grid[i+1][x] = val

def down():
    global grid
    for y in range(2,-1,-1):
        for x in range(0,4):
            val = grid[y][x] 
            if val != 0:
                i = y+1
                while i < 3 and grid[i][x] == 0:
                    i += 1
                if grid[i][x] == val:
                    grid[y][x] = 0
                    grid[i][x] += val
                elif grid[i][x] == 0:
                    grid[y][x] = 0
                    grid[i][x] = val
                else:
                    grid[y][x] = 0
                    grid[i-1][x] = val

def left():
    global grid
    for y in range(0,4):
        for x in range(1,4):
            val = grid[y][x] 
            if val != 0:
                i = x-1
                while i > 0 and grid[y][i] == 0:
                    i -= 1
                if grid[y][i] == val:
                    grid[y][x] = 0
                    grid[y][i] += val
                elif grid[y][i] == 0:
                    grid[y][x] = 0
                    grid[y][i] = val
                else:
                    grid[y][x] = 0
                    grid[y][i+1] = val

def right():
    global grid
    for y in range(0,4):
        for x in range(2,-1,-1):
            val = grid[y][x] 
            if val != 0:
                i = x+1
                while i < 3 and grid[y][i] == 0:
                    i += 1
                if grid[y][i] == val:
                    grid[y][x] = 0
                    grid[y][i] += val
                elif grid[y][i] == 0:
                    grid[y][x] = 0
                    grid[y][i] = val
                else:
                    grid[y][x] = 0
                    grid[y][i-1] = val

def placeNum():
    global grid
    i = random.randint(0,3)
    j = random.randint(0,3)
    while (grid[i][j] != 0):
        i = random.randint(0,3)
        j = random.randint(0,3)
    grid[i][j] = 2

grid = np.zeros((4, 4), dtype=int)

while(True):
    placeNum()
    display()
    direction = input()
    if direction == 'w':
        up()
    elif direction == 's':
        down()
    elif direction == 'a':
        left()
    elif direction == 'd':
        right()
