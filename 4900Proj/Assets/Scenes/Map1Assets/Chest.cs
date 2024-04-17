using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Chest : MonoBehaviour
{
    private bool isLooted =false;

    [SerializeField]
    private Sprite closeChest, openChest;   // sprite of closedChest and openedChest


    [SerializeField]
    SpriteRenderer chestRenderer; //chest object

    public bool playerIsClose;   //checks if the player is nearby
    
    
    void Start()
    {
        chestRenderer.sprite=closeChest;

    }
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.E) && playerIsClose)           // only activates when the player interacts with it 
        {
            chestRenderer.sprite=openChest;                         //chest will open
            isLooted=true;                                          //is now looted
        }
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            playerIsClose = true;
        }
    }
     private void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            playerIsClose = false;
       
        }
    }
    


}
