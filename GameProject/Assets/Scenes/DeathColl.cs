using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
public class DeathColl : MonoBehaviour
{


    public int Respawn;  //int indicates which scene it will respawn in
    
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if(other.CompareTag("Player"))
        {
            SceneManager.LoadScene(2);
            Stats.Instance.health = Stats.Instance.maxHP;
        }
    }
}
