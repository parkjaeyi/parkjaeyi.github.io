using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player_death : Stats
    // Start is called before the first frame update
    {
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    public void TakeDamage(int ReceivedDamage)
    { 
        health -= ReceivedDamage;
    }
    void Die()
   {
    //anim.SetTrigger("isDead");
    Destroy(gameObject);
   }
   }

