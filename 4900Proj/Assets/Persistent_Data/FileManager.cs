using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

public class FileManager
{
    public static bool WriteToFile(string fileName, string contents)
    {
        var path = Path.Combine(Application.persistentDataPath, fileName);
        try
        {
            File.WriteAllText(path, contents);
            return true;
        }
        catch (Exception e)
        {
            Debug.LogError($"Failed to write to {path} with exception {e}");
            return false;
        }
    }

    public static bool ReadFromFile(string fileName, out string data)
    {
        var path = Path.Combine(Application.persistentDataPath, fileName);
        try
        {
            data = File.ReadAllText(path);
            return true;
        }
        catch (Exception e)
        {
            Debug.LogError($"Failed to read from {path} with exception {e}");
            data = "";
            return false;
        }
    }
}
