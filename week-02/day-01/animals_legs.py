# Write a program that asks for two integers
# The first represents the number of chickens the farmer has
# The seconf represents the number of pigs the farmer has
# It should print how many legs all the animals have

chickens = int(input('Chickens: '))
pigs = int(input('Pigs: '))

clegs = chickens * 2
plegs = pigs * 4

print(plegs + clegs)