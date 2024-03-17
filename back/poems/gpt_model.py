from transformers import GPT2LMHeadModel, GPT2Tokenizer
import json, os

# Load pre-trained model and tokenizer
model_name = "gpt2"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

def generate_poem(input_text, poet_style):
    # Get the directory of the current script
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Path to the poet_prompts.json file
    poet_prompts_path = os.path.join(current_dir, 'poet_prompts.json')

    with open(poet_prompts_path, 'r') as f:
        poet_prompts = json.load(f)

    # Choose prompt based on poet style or use input text
    prompt = poet_prompts.get(poet_style, input_text)

    # Tokenize input text
    input_ids = tokenizer.encode(prompt, return_tensors="pt")

    # Generate text
    max_length = 200  # Adjust the length as needed
    output = model.generate(input_ids, max_length=max_length, num_return_sequences=1, temperature=0.9, do_sample=True, pad_token_id=tokenizer.eos_token_id)
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)

    # Remove the poet style text from the generated text
    poet_style_text = poet_prompts.get(poet_style, "")
    generated_text_parts = generated_text.split(poet_style_text)
    generated_text = " ".join(generated_text_parts).strip()

    return generated_text

# Example 

# custom_prompt = input("Enter your custom prompt: ")
# poet_style = "EDGAR_ALLAN_POE"
# generated_poem = generate_poem(custom_prompt, poet_style)
# print("Generated Poem:")
# print(generated_poem)
