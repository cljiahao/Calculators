import re
from tkinter import *

class Calculator():
    def __init__(self) -> None:
        self.root = Tk()
        self.initialize()
        self.widgets()
        self.root.mainloop()

    def initialize(self):
        self.butArr = [["AC","","Del","÷"],
                       ["1","2","3","*"],
                       ["4","5","6","-"],
                       ["7","8","9","+"],
                       [".","0","=",""]]
        self.buttons = {}
        self.font = ("Calibri",25)

        self.frame = Frame(self.root)
        self.frame.pack(expand=True, fill='both')

    def widgets(self):

        # Frames for each portion
        #######################################################

        displayFrame = Frame(self.frame)
        displayFrame.columnconfigure(0,weight=1)
        displayFrame.grid(row=0,column=0,sticky=NSEW)
        
        butFrame = Frame(self.frame)
        butFrame.grid(row=1,column=0,sticky=NSEW)

        # Display Widgets
        #######################################################

        self.previous = Label(displayFrame,text=0,anchor=E,font=self.font)
        self.previous.grid(row=0,column=0,ipadx=10,ipady=20,padx=20,columnspan=5,sticky=EW)
        
        self.current = Entry(displayFrame,justify=RIGHT,font=self.font)
        self.current.grid(row=1,column=0,ipadx=10,ipady=20,padx=20,columnspan=5,sticky=EW)

        # Button Widgets
        #######################################################      

        for i,j in enumerate(self.butArr):
            for a,b in enumerate(j):
                try: x = 2 if j[a+1] == "" else 1 
                except: x = 1
                if b == "": continue
                self.buttons[b] = Button(butFrame,text=b,font=self.font,width=10, command=lambda b=b: self.updateCurr(b))
                self.buttons[b].grid(row=i,column=a,ipadx=10,ipady=20,columnspan=x,sticky=EW)

        self.current.focus()

    ####################################################################################################
    """
    Functions to run calculator
    """
    ####################################################################################################

    def updateCurr(self,value):
        
        curVal = self.current.get()
        pos = len(curVal)
        operators = ['+','-','*','÷']

        if value == '=': return self.evaluate(self.current.get())

        if value == "AC" or value == "Del":
            if value == "AC": self.current.delete(0,END)
            else: self.current.delete(pos-1,END)            
            value = ""

        if value == '.':
            if value in re.split('[+ - * ÷]', curVal)[-1]: return
            elif len(re.split('[+ - * ÷]', curVal)[-1]) == 0: value = "0" + value

        if len(curVal) > 0 and curVal[-1] in operators:
                if curVal[-1] == value: return
                elif value in operators: self.current.delete(pos-1,END)

        self.current.insert(pos,value)

    def evaluate(self,working):
        
        if len(working) == 0: self.previous.config(text=0)
        else: self.previous.config(text=eval(working))
        self.current.delete(0,END)
        self.current.insert(0,eval(working))
    
Calculator()