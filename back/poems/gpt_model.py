from transformers import GPT2LMHeadModel, GPT2Tokenizer
import json

# Load pre-trained model and tokenizer
model_name = "gpt2"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

def generate_poem(input_text, poet_style):
    # Define prompts for different poets
    with open('./poet_prompts.json', 'r') as f:
        poet_prompts = json.load(f)

    # Choose prompt based on poet style or use input text
    prompt = poet_prompts.get(poet_style, input_text)

    # Tokenize input text
    input_ids = tokenizer.encode(prompt, return_tensors="pt")

    # Generate text
    max_length = 200  # Adjust the length as needed
    output = model.generate(input_ids, max_length=max_length, num_return_sequences=1, temperature=0.9, do_sample=True, pad_token_id=tokenizer.eos_token_id)
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    return generated_text

# # Example usage
# custom_prompt = input("Enter your custom prompt: ")
# poet_style = PoetStyle.HP_LOVECRAFT
# generated_poem = generate_poem(custom_prompt, poet_style)
# print("Generated Poem:")
# print(generated_poem)
